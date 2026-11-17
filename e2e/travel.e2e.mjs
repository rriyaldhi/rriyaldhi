import { expect, test } from '@playwright/test';

test('the world map tilts into view and settles flat', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 430 });
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

  for (const name of ['Terracotta Army', 'Great Wall of China']) {
    await expect(travel.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  for (const image of await travel.getByRole('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
  }

  await travel.getByRole('button', { name: 'Back to world map' }).click();
  await expect(china).toBeFocused();
  await expect(china).toHaveAttribute('aria-expanded', 'false');
  await expect(travel.getByRole('heading', { name: 'Terracotta Army' })).toHaveCount(0);
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
