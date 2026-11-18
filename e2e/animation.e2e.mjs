import { expect, test } from '@playwright/test';
import { countDarkPixels } from './darkPixels.mjs';

test('a 3D letter flips to its dark face on hover and returns when the pointer leaves', async ({ page, baseURL }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.route('**/*', (route) => {
    // Keep the rendering check independent of third-party fonts and stylesheets.
    return new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort();
  });
  await page.goto('/');

  const canvas = page.locator('.site-title-canvas');
  await expect(canvas).toBeVisible();
  const bounds = await canvas.boundingBox();
  const x = Math.round(bounds.x + bounds.width / 2 + 24);
  const y = Math.round(bounds.y + bounds.height / 2);
  expect(y, 'The 3D title is centered on the landing view').toBe(400);
  // Sample the inside of a single near-center letter's face.
  const face = { x: x - 12, y: y - 12, width: 24, height: 24 };
  const darkPixels = () => countDarkPixels(page, { clip: face });

  await expect.poll(darkPixels, { message: 'The front of the letter is visible' }).toBeGreaterThan(5);
  const front = await darkPixels();

  await expect.poll(async () => {
    // Move within the face so input is picked up as soon as the entrance animation ends.
    await page.mouse.move(x - 1, y);
    await page.mouse.move(x, y);
    return darkPixels();
  }, { message: 'Hover reveals the dark face', timeout: 8_000 }).toBeGreaterThan(front + 150);

  await page.mouse.move(x, 8);
  await expect.poll(async () => Math.abs(await darkPixels() - front), {
    message: 'Moving away restores the front of the letter',
  }).toBeLessThan(25);
  expect(pageErrors).toEqual([]);
});

for (const section of ['books', 'travel']) {
  test(`the name still flips on hover in ${section}`, async ({ page, baseURL }) => {
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort());
    await page.goto(`/#${section}`);
    const canvas = page.locator('.site-title-canvas');
    await expect(canvas).toBeVisible();
    const bounds = await canvas.boundingBox();
    const x = Math.round(bounds.x + bounds.width / 2 + 16);
    const y = Math.round(bounds.y + bounds.height / 2);
    const face = { x: x - 8, y: y - 8, width: 16, height: 16 };
    const darkPixels = () => countDarkPixels(page, { clip: face });
    await expect.poll(darkPixels).toBeGreaterThan(2);
    const front = await darkPixels();
    await expect.poll(async () => {
      await page.mouse.move(x - 1, y);
      await page.mouse.move(x, y);
      return darkPixels();
    }).toBeGreaterThan(front + 65);
    await page.mouse.move(8, 8);
    await expect.poll(async () => Math.abs(await darkPixels() - front)).toBeLessThan(20);
  });
}

test('navigation flips as whole equal-width cubes and home sits closer to the left edge', async ({ page }) => {
  await page.goto('/');
  const books = page.getByRole('link', { name: 'Books', exact: true });
  const travel = page.getByRole('link', { name: 'Travel', exact: true });
  const bounds = await books.boundingBox();
  expect((await travel.boundingBox()).width).toBe(bounds.width);
  const front = await countDarkPixels(page, { clip: bounds });
  await books.hover();
  await expect.poll(() => countDarkPixels(page, { clip: bounds })).toBeGreaterThan(bounds.width * bounds.height * 0.65);
  await page.mouse.move(8, 8);
  await expect.poll(async () => Math.abs(await countDarkPixels(page, { clip: bounds }) - front)).toBeLessThan(25);
  await books.click();
  const home = page.getByRole('link', { name: 'Back to home' });
  await expect(home).toBeVisible();
  expect((await home.boundingBox()).x).toBeLessThan(bounds.x);
  await home.hover();
  const homeBounds = await home.boundingBox();
  await expect.poll(() => countDarkPixels(page, { clip: homeBounds })).toBeGreaterThan(homeBounds.width * homeBounds.height * 0.65);
});
