import { expect, test } from '@playwright/test';

async function countDarkPixels(page, clip) {
  const screenshot = await page.screenshot({ clip });
  return page.evaluate(async (image) => {
    const bytes = Uint8Array.from(atob(image), (character) => character.charCodeAt(0));
    const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0);
    bitmap.close();
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let darkPixels = 0;
    for (let index = 0; index < data.length; index += 4) {
      if (data[index] < 32 && data[index + 1] < 32 && data[index + 2] < 32) {
        darkPixels++;
      }
    }
    return darkPixels;
  }, screenshot.toString('base64'));
}

test('a 3D letter flips to its dark face on hover and returns when the pointer leaves', async ({ page, baseURL }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.route('**/*', (route) => {
    // Keep the rendering check independent of third-party fonts and stylesheets.
    return new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort();
  });
  await page.goto('/');

  const canvas = page.locator('#main canvas');
  await expect(canvas).toBeVisible();
  const bounds = await canvas.boundingBox();
  const x = Math.round(bounds.x + bounds.width / 2 + 24);
  const y = Math.round(bounds.y + bounds.height / 2);
  // Sample the inside of a single near-center letter's face.
  const face = { x: x - 12, y: y - 12, width: 24, height: 24 };
  const darkPixels = () => countDarkPixels(page, face);

  await expect.poll(darkPixels, { message: 'The front of the letter is visible' }).toBeGreaterThan(5);
  const front = await darkPixels();

  await expect.poll(async () => {
    // Move within the face so input is picked up as soon as the entrance animation ends.
    await page.mouse.move(x - 1, y);
    await page.mouse.move(x, y);
    return darkPixels();
  }, { message: 'Hover reveals the dark face', timeout: 8_000 }).toBeGreaterThan(front + 150);

  await page.mouse.move(x, Math.round(bounds.y + 8));
  await expect.poll(async () => Math.abs(await darkPixels() - front), {
    message: 'Moving away restores the front of the letter',
  }).toBeLessThan(25);
  expect(pageErrors).toEqual([]);
});
