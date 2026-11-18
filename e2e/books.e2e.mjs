import { expect, test } from '@playwright/test';
import { countDarkPixels } from './darkPixels.mjs';

async function expectSingleLine(heading) {
  await expect(heading).toBeVisible();
  expect(await heading.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getClientRects().length;
  })).toBe(1);
}

async function expectPaintedIllustration(page, illustration) {
  await expect(illustration).toBeInViewport({ ratio: 1 });
  const clip = await illustration.boundingBox();
  const darkPixels = await countDarkPixels(page, { clip, animations: 'disabled', scale: 'css' }, 96);
  expect(darkPixels).toBeGreaterThan(100);
}

test.beforeEach(async ({ page, baseURL }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort(),
  );
});

test('a shelf book opens partway on hover and closes when the pointer leaves', async ({ page }) => {
  await page.goto('/#books');
  const book = page.getByRole('button', { name: 'Read Sapiens' });
  const cover = book.locator('.book-card-cover');
  const pages = book.locator('.book-card-pages');
  await book.hover();
  await expect.poll(async () => {
    const front = await cover.boundingBox();
    const paper = await pages.boundingBox();
    return paper.x + paper.width - (front.x + front.width);
  }).toBeGreaterThan(25);
  await page.mouse.move(8, 8);
  await expect.poll(() => cover.evaluate(element => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return Math.abs(matrix.m13);
  })).toBeLessThan(0.01);
  await book.focus();
  await expect.poll(() => cover.evaluate(element => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return Math.abs(matrix.m13);
  })).toBeGreaterThan(0.5);
});

test('opens the illustrated shelf cover and inverts buttons on hover', async ({ page }) => {
  await page.goto('/#books');
  const shelf = page.getByRole('region', { name: 'Books' });
  const openBook = shelf.getByRole('button', { name: 'Read Sapiens' });
  await expect(openBook).toHaveCSS('background-color', 'rgb(255, 255, 255)');

  await openBook.hover();
  await expect(openBook).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(openBook).toHaveCSS('color', 'rgb(255, 255, 255)');
  await page.evaluate(() => {
    window.coverMotion = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      if (this.matches('.book-flight .book-card')) {
        window.coverMotion.push({ title: this.querySelector('.book-card-title')?.textContent, frames, direction: options.direction });
      }
      return animate.call(this, frames, options);
    };
  });
  await openBook.click();

  const book = page.getByRole('dialog', { name: 'Sapiens' });
  const coverMotion = () => page.evaluate(() => window.coverMotion);
  await expect.poll(coverMotion).toEqual([expect.objectContaining({
    title: 'Sapiens',
    frames: expect.arrayContaining([expect.objectContaining({ transform: expect.stringContaining('rotateY') })]),
  })]);

  const next = page.getByRole('button', { name: 'Next page' });
  await next.hover();
  await expect(next).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(next).toHaveCSS('color', 'rgb(255, 255, 255)');
  await next.click();
  const previous = book.getByRole('button', { name: 'Previous page' });
  await previous.hover();
  await expect.poll(() => previous.locator('.nav-cube').evaluate(element =>
    Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m22),
  )).toBeLessThan(0.01);
  await previous.click();
  await expect(book.getByRole('status')).toHaveText('Page 1 of 3');
  await expect(book).not.toHaveAttribute('data-cover-motion');
  await book.getByRole('button', { name: 'Close book' }).click();
  await expect(book).toBeHidden();
  expect((await coverMotion()).map(({ direction }) => direction)).toEqual(['normal', 'reverse']);
});

test('reads all three Sapiens pages and returns to the bookshelf', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#books');
  const openBook = page.getByRole('button', { name: 'Read Sapiens' });
  await openBook.click();

  const book = page.getByRole('dialog', { name: 'Sapiens' });
  const next = book.getByRole('button', { name: 'Next page' });
  const previous = book.getByRole('button', { name: 'Previous page' });
  await expect(book).toBeVisible();
  await expectSingleLine(book.getByRole('heading', { name: 'Sapiens', exact: true }));
  await expect(previous).toBeDisabled();
  await expect(book.getByRole('heading', { name: 'The cost of agriculture' })).toBeVisible();
  await expect(book.getByRole('img')).toHaveCount(1);
  await expect.poll(() => book.getByRole('img').evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);

  await next.click();
  await expect(book.locator('.book-leaf--turn-forward')).toHaveCSS('animation-name', 'book-turn-forward');
  await expectSingleLine(book.getByRole('heading', { name: 'Shared stories' }));
  await expect(book.getByText(/Shared stories let strangers cooperate\./)).toBeVisible();
  await expect(book.getByRole('link', { name: 'Harari on power and imagination' })).toHaveAttribute(
    'href', 'https://www.ynharari.com/topic/power-and-imagination/',
  );

  await page.keyboard.press('ArrowRight');
  await expectSingleLine(book.getByRole('heading', { name: 'Power and happiness' }));
  await expect(book.getByText(/More power doesn’t guarantee more happiness\./)).toBeVisible();
  await expect(next).toBeDisabled();
  await expect(book.getByRole('status')).toHaveText('Page 3 of 3');

  await previous.click();
  await expect(book.getByRole('status')).toHaveText('Page 2 of 3');
  await page.keyboard.press('Escape');
  await expect(book).toBeHidden();
  await expect(openBook).toBeFocused();
});

test('keeps the reader inside a narrow viewport with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#books');
  await page.getByRole('button', { name: 'Read Sapiens' }).click();
  const book = page.getByRole('dialog', { name: 'Sapiens' });

  expect(await book.evaluate((dialog) => dialog.getAnimations().length)).toBe(0);
  await expectSingleLine(book.getByRole('heading', { name: 'Sapiens', exact: true }));
  await book.getByRole('button', { name: 'Next page' }).click();
  await expect(book.getByRole('status')).toHaveText('Page 2 of 3');
  await expectSingleLine(book.getByRole('heading', { name: 'Shared stories' }));
  await expect(book.getByRole('article')).toHaveCSS('animation-name', 'none');
  await book.getByRole('button', { name: 'Next page' }).click();
  await expectSingleLine(book.getByRole('heading', { name: 'Power and happiness' }));
  expect(await book.evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth)).toBe(true);
  await book.getByRole('button', { name: 'Close book' }).click();
  await expect(book).toBeHidden();
});

for (const [orientation, viewport] of [
  ['portrait', { width: 375, height: 420 }],
  ['landscape', { width: 667, height: 320 }],
]) {
  test.describe(`on a short mobile viewport in ${orientation}`, () => {
    test.use({ viewport, isMobile: true, hasTouch: true });

    for (const [title, secondPage] of [
      ['Sapiens', 'Shared stories'],
      ['How to Avoid a Climate Disaster', 'Beyond clean power'],
      ['Inside of a Dog', 'Smelling the past'],
    ]) {
      test(`shows the start of page two of ${title} after tapping Next`, async ({ page }) => {
        await page.goto('/#books');
        await page.getByRole('button', { name: `Read ${title}` }).tap();
        const book = page.getByRole('dialog', { name: title });
        const controls = book.getByRole('group', { name: 'Book pages' });
        const illustration = book.getByRole('img');
        const firstImage = await illustration.getAttribute('src');

        await controls.getByRole('button', { name: 'Next page' }).tap();
        await expect(controls.getByRole('status')).toHaveText('Page 2 of 3');
        const heading = book.getByRole('heading', { name: secondPage });
        await expect(heading).toBeInViewport({ ratio: 1 });
        await expect.poll(async () => {
          const bounds = await heading.boundingBox();
          return bounds.y + bounds.height <= (await controls.boundingBox()).y;
        }).toBe(true);
        await expect(illustration).not.toHaveAttribute('src', firstImage);
        await expect.poll(() => illustration.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
        await expectPaintedIllustration(page, illustration);
      });
    }
  });
}

test('keeps the reader usable through mobile resize events without rebuilding the title', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.addInitScript(() => {
    window.titleTextureCount = 0;
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, options) {
      if (type === '2d' && this.width === 512 && this.height === 512) {
        window.titleTextureCount++;
      }
      return getContext.call(this, type, options);
    };
  });
  await page.goto('/#books');
  await expect.poll(() => page.evaluate(() => window.titleTextureCount)).toBeGreaterThan(0);

  await page.getByRole('button', { name: 'Read Sapiens' }).click();
  const book = page.getByRole('dialog', { name: 'Sapiens' });
  const allocatedTextures = await page.evaluate(() => {
    const before = window.titleTextureCount;
    for (let i = 0; i < 3; i++) window.dispatchEvent(new Event('resize'));
    return window.titleTextureCount - before;
  });
  expect(allocatedTextures).toBe(0);

  await book.getByRole('button', { name: 'Next page' }).click();
  await expect(book.getByRole('heading', { name: 'Shared stories' })).toBeInViewport({ ratio: 1 });
});

test('reads the climate book and keeps its page position separate from Sapiens', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#books');
  const title = 'How to Avoid a Climate Disaster';
  const openClimateBook = page.getByRole('button', { name: `Read ${title}` });
  await openClimateBook.click();
  const climateBook = page.getByRole('dialog', { name: title });
  const next = climateBook.getByRole('button', { name: 'Next page' });
  expect(await climateBook.evaluate((dialog) => {
    dialog.scrollTop = dialog.scrollHeight;
    return dialog.scrollTop;
  })).toBe(0);

  for (const heading of ['Why net zero?', 'Beyond clean power', 'The Green Premium']) {
    const pageHeading = climateBook.getByRole('heading', { name: heading });
    await expectSingleLine(pageHeading);
    await expect(pageHeading).toBeInViewport();
    const illustration = climateBook.getByRole('img');
    await expect.poll(() => illustration.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(climateBook.getByRole('link', { name: /^Gates/ })).toBeVisible();
    if (heading !== 'The Green Premium') {
      await next.click();
      await expect(next).toBeInViewport();
    }
  }
  await expect(next).toBeDisabled();
  expect(await climateBook.evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth)).toBe(true);
  await climateBook.getByRole('button', { name: 'Close book' }).click();

  await page.getByRole('button', { name: 'Read Sapiens' }).click();
  const sapiens = page.getByRole('dialog', { name: 'Sapiens' });
  await expect(sapiens.getByRole('status')).toHaveText('Page 1 of 3');
  await sapiens.getByRole('button', { name: 'Close book' }).click();

  await openClimateBook.click();
  await expect(climateBook.getByRole('status')).toHaveText('Page 3 of 3');
});
