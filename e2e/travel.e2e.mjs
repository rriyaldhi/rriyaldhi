import { expect, test } from '@playwright/test';

test('the world map tilts into view and settles flat', async ({ page }) => {
  // Keep the narrower map partly below the fold beside the navigation rail.
  await page.setViewportSize({ width: 900, height: 350 });
  await page.goto('/#travel');
  const frame = page.locator('.travel-map');
  await expect.poll(() => frame.evaluate((map) => {
    const transform = getComputedStyle(map).transform;
    return transform !== 'none' && Math.abs(new DOMMatrixReadOnly(transform).m23) > 0.1;
  })).toBe(true);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(frame).toHaveCSS('transform', 'none');
});

test('opens China from its map shape and returns to the world map', async ({ page }) => {
  await page.goto('/#travel');
  const travel = page.getByRole('region', { name: 'Travel', exact: true });
  const china = travel.getByRole('button', { name: 'China', exact: true });

  await expect(china).toHaveAttribute('aria-expanded', 'false');
  await travel.locator('path[data-country="CHN"]').click();
  await expect(china).toHaveAttribute('aria-expanded', 'true');
  const heading = travel.getByRole('heading', { name: 'China', exact: true });
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport();

  for (const name of ['Terracotta Army', 'Great Wall of China']) {
    await expect(travel.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  for (const image of await travel.getByRole('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
  }

  const back = travel.getByRole('button', { name: 'Back to world map' });
  await back.hover();
  await expect.poll(() => back.locator('.nav-cube').evaluate(element =>
    Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m22),
  )).toBeLessThan(0.01);
  await back.click();
  await expect(china).toBeFocused();
  await expect(china).toHaveAttribute('aria-expanded', 'false');
  await expect(travel.getByRole('heading', { name: 'Terracotta Army' })).toHaveCount(0);
});

test('returning to Travel resets the selected country and historical sites', async ({ page }) => {
  await page.goto('/#travel');
  const china = page.getByRole('button', { name: 'China', exact: true });
  await china.click();
  await expect(china).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Travel', exact: true }).click();
  await expect(china).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('heading', { name: 'Terracotta Army', exact: true })).toHaveCount(0);
  await expect(page.locator('#travel-places')).toBeHidden();
});

test('opens the country with the keyboard on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#travel');
  const travel = page.getByRole('region', { name: 'Travel', exact: true });
  const china = travel.getByRole('button', { name: 'China', exact: true });
  await expect(travel.locator('.travel-map')).toHaveCSS('transform', 'none');
  await china.focus();
  await page.keyboard.press('Enter');

  await expect(travel.getByRole('heading', { name: 'China', exact: true })).toBeFocused();
  await expect(travel.getByRole('heading', { name: 'Great Wall of China', exact: true })).toBeVisible();
  expect(await travel.evaluate(element => element.scrollWidth)).toBeLessThanOrEqual(375);
});

for (const width of [1100, 375]) {
  test(`all visited countries and landmarks are accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#travel');
    const travel = page.getByRole('region', { name: 'Travel', exact: true });
    const entries = [
      ['China', ['Terracotta Army', 'Great Wall of China']],
      ['Indonesia', ['Borobudur', 'Prambanan']],
      ['Singapore', ['Buddha Tooth Relic Temple']],
      ['Germany', ['Berlin Wall', 'Brandenburg Gate']],
      ['Australia', ['Sydney Opera House']],
      ['Italy', ['Colosseum', 'Leaning Tower of Pisa', 'Venice']],
      ['Monaco', ['Monte Carlo Casino']],
      ['Vatican City', ['St. Peter’s Basilica']],
      ['Andorra', ['Andorra la Vella']],
      ['Spain', ['Sagrada Família']],
    ];
    await expect(travel.locator('.travel-map-marker')).toHaveCount(10);
    for (const [country, landmarks] of entries) {
      const button = travel.getByRole('button', { name: country, exact: true });
      await button.click();
      await expect(travel.getByRole('heading', { name: country, exact: true })).toBeFocused();
      for (const landmark of landmarks) {
        await expect(travel.getByRole('heading', { name: landmark, exact: true })).toBeVisible();
      }
      for (const image of await travel.getByRole('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
      }
      expect(await travel.evaluate(element => element.scrollWidth)).toBeLessThanOrEqual(width);
      await travel.getByRole('button', { name: 'Back to world map' }).click();
      await expect(button).toBeFocused();
    }
  });
}
