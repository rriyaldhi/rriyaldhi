import { expect, test } from '@playwright/test';

test('opens one section at a time and returns the name to the center', async ({ page, baseURL }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort(),
  );
  await page.goto('/');
  const name = page.getByRole('heading', { name: 'rizky riyaldhi' });
  const menu = page.getByRole('navigation');
  const home = page.getByRole('link', { name: 'Back to home' });
  const books = page.getByRole('region', { name: 'Books', exact: true });
  const travel = page.getByRole('region', { name: 'Travel', exact: true });
  const nameCenter = () => name.evaluate((element) => {
    const { top, height } = element.getBoundingClientRect();
    return Math.round(top + height / 2);
  });

  await expect.poll(nameCenter).toBe(400);
  await expect(home).toBeHidden();
  await expect(books).toBeHidden();
  await expect(travel).toBeHidden();
  expect((await menu.boundingBox()).x).toBeLessThan(100);

  await menu.getByRole('link', { name: 'Books' }).click();
  await expect(page).toHaveURL(/#books$/);
  await expect(menu).toHaveCount(0);
  await expect(home).toBeFocused();
  await expect(books).toBeVisible();
  await expect(travel).toBeHidden();
  await expect.poll(nameCenter).toBeLessThan(100);

  const cover = books.getByRole('button', { name: 'Read Sapiens' });
  await cover.click();
  const reader = page.getByRole('dialog', { name: 'Sapiens' });
  await expect(reader).toBeVisible();
  await page.goBack();
  await expect(reader).toBeHidden();
  await expect(menu.getByRole('link', { name: 'Books' })).toBeFocused();
  await page.goForward();
  await expect(books).toBeVisible();
  await expect(reader).toBeHidden();

  await home.click();
  await menu.getByRole('link', { name: 'Travel' }).click();
  await expect(menu).toHaveCount(0);
  await expect(travel).toBeVisible();
  await expect(books).toBeHidden();
  await page.goBack();
  await expect(menu).toBeVisible();
  await page.goBack();
  await expect(books).toBeVisible();

  await home.click();
  await expect(home).toBeHidden();
  await expect(books).toBeHidden();
  await expect(travel).toBeHidden();
  await expect.poll(nameCenter).toBe(400);
});

test('keeps the menu and name visible on a narrow screen with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const name = page.getByRole('heading', { name: 'rizky riyaldhi' });
  const menu = page.getByRole('navigation');
  await expect(name).toBeInViewport({ ratio: 1 });
  await expect(menu).toBeInViewport({ ratio: 1 });

  const travelLink = menu.getByRole('link', { name: 'Travel' });
  await travelLink.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Travel', exact: true })).toBeVisible();
  await expect(name).toBeInViewport({ ratio: 1 });
  await expect(menu).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(await page.locator('#app').evaluate((app) => app.getAnimations({ subtree: true }))).toEqual([]);

  const home = page.getByRole('link', { name: 'Back to home' });
  await expect(home).toBeInViewport({ ratio: 1 });
  await home.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Travel', exact: true })).toBeHidden();
});
