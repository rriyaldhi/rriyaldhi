import { expect, test } from '@playwright/test';

test('opens one section at a time and returns the name to the center', async ({ page, baseURL }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort(),
  );
  await page.goto('/');
  const name = page.getByRole('heading', { name: 'rizky riyaldhi' });
  const menu = page.getByRole('navigation');
  const home = menu.getByRole('link', { name: 'Home' });
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
  await expect(menu.getByRole('link', { name: 'Books' })).toHaveAttribute('aria-current', 'page');
  await expect(books).toBeVisible();
  await expect(travel).toBeHidden();
  await expect.poll(nameCenter).toBeLessThan(100);

  await menu.getByRole('link', { name: 'Travel' }).click();
  await expect(travel).toBeVisible();
  await expect(books).toBeHidden();
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
  expect((await menu.boundingBox()).y + (await menu.boundingBox()).height).toBeLessThan(
    (await name.boundingBox()).y,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(await page.locator('.site-header').evaluate((header) => header.getAnimations())).toEqual([]);

  const home = menu.getByRole('link', { name: 'Home' });
  await expect(home).toBeInViewport({ ratio: 1 });
  await home.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Travel', exact: true })).toBeHidden();
});
