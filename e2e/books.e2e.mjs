import { expect, test } from '@playwright/test';

async function expectSingleLine(heading) {
  await expect(heading).toBeVisible();
  expect(await heading.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getClientRects().length;
  })).toBe(1);
}

test.beforeEach(async ({ page, baseURL }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort(),
  );
});

test('lists Sapiens on the bookshelf and inverts buttons on hover', async ({ page }) => {
  await page.goto('/');
  const shelf = page.getByRole('region', { name: 'Books' });
  const openBook = shelf.getByRole('button', { name: 'Read Sapiens' });
  await expect(openBook).toHaveCSS('background-color', 'rgb(255, 255, 255)');

  await openBook.hover();
  await expect(openBook).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(openBook).toHaveCSS('color', 'rgb(255, 255, 255)');
  await openBook.click();

  const next = page.getByRole('button', { name: 'Next page' });
  await next.hover();
  await expect(next).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(next).toHaveCSS('color', 'rgb(255, 255, 255)');
});

test('reads all three Sapiens pages and returns to the homepage', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
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
  await page.goto('/');
  await page.getByRole('button', { name: 'Read Sapiens' }).click();
  const book = page.getByRole('dialog', { name: 'Sapiens' });

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

test('reads the climate book and keeps its page position separate from Sapiens', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const title = 'How to Avoid a Climate Disaster';
  const openClimateBook = page.getByRole('button', { name: `Read ${title}` });
  await openClimateBook.click();
  const climateBook = page.getByRole('dialog', { name: title });
  const next = climateBook.getByRole('button', { name: 'Next page' });
  expect(await climateBook.evaluate((dialog) => {
    dialog.scrollTop = dialog.scrollHeight;
    return dialog.scrollTop;
  })).toBeGreaterThan(0);

  for (const heading of ['Why net zero?', 'Beyond clean power', 'The Green Premium']) {
    await expectSingleLine(climateBook.getByRole('heading', { name: heading }));
    const illustration = climateBook.getByRole('img');
    await expect.poll(() => illustration.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(climateBook.getByRole('link', { name: /^Gates/ })).toBeVisible();
    if (heading !== 'The Green Premium') {
      await next.click();
      await expect(climateBook).toHaveJSProperty('scrollTop', 0);
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
