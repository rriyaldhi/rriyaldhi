export async function countDarkPixels(page, screenshotOptions, threshold = 32) {
  const screenshot = await page.screenshot(screenshotOptions);
  return page.evaluate(async ({ image, threshold }) => {
    const bytes = Uint8Array.from(atob(image), (character) => character.charCodeAt(0));
    const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0);
    bitmap.close();
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let darkPixels = 0;
    for (let index = 0; index < data.length; index += 4) {
      if (data[index] < threshold && data[index + 1] < threshold && data[index + 2] < threshold) {
        darkPixels++;
      }
    }
    return darkPixels;
  }, { image: screenshot.toString('base64'), threshold });
}
