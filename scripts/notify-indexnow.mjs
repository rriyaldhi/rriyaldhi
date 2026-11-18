import { readFile } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

const homepage = 'https://rriyaldhi.co/';
const key = (await readFile(new URL('../public/f281d3e74fa910671f4bd95f7afffcf1.txt', import.meta.url), 'utf8')).trim();
const keyLocation = `${homepage}${key}.txt`;

// Wait for the deployment to reach the public CDN before notifying crawlers.
for (let attempt = 1; ; attempt++) {
  try {
    const liveKey = await fetch(keyLocation, { signal: AbortSignal.timeout(15000), cache: 'no-store' });
    if (!liveKey.ok || (await liveKey.text()).trim() !== key) throw new Error('Live IndexNow key is not available yet.');
    break;
  } catch (error) {
    if (attempt === 6) throw error;
    console.log(`Waiting for live key (attempt ${attempt}/6).`);
    await setTimeout(10000);
  }
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'rriyaldhi.co', key, keyLocation, urlList: [homepage] }),
  signal: AbortSignal.timeout(30000),
});
if (response.status !== 200 && response.status !== 202) {
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${await response.text()}`);
}
console.log(`IndexNow received ${homepage}: HTTP ${response.status}${response.status === 202 ? ' (key validation pending)' : ''}. This confirms submission, not indexing.`);
