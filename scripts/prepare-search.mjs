import assert from 'node:assert/strict';
import { copyFile, readFile, readdir } from 'node:fs/promises';

// Webpack cleans dist on every build, so publish these from versioned sources.
for (const name of await readdir(new URL('../public/', import.meta.url))) {
  await copyFile(new URL(`../public/${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}

const read = name => readFile(new URL(`../dist/${name}`, import.meta.url), 'utf8');
const html = await read('index.html');
const sitemap = await read('sitemap.xml');
const robots = await read('robots.txt');
assert.match(html, /<title>Rizky Riyaldhi \| Personal Website<\/title>/);
// Production HTML minification removes optional attribute quotes.
assert.match(html, /<meta\s+name="?description"?\s+content="[^"]+"/);
assert.match(html, /<link\s+rel="?canonical"?\s+href="?https:\/\/rriyaldhi\.co\/"?[\s>]/);
assert.match(html, /<meta\s+name="?google-site-verification"?\s+content="?cPaq1wDVVbEJ6xl9WW_vm5q74Zw18s40jluijAKECt8"?[\s>]/);
assert.match(html, /<h1[^>]*>rizky riyaldhi<\/h1>/);
assert.doesNotMatch(html, /<meta[^>]+name="?robots"?[^>]+noindex/i);
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), ['https://rriyaldhi.co/']);
assert.match(robots, /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/rriyaldhi\.co\/sitemap\.xml/);
assert.equal((await read('f281d3e74fa910671f4bd95f7afffcf1.txt')).trim(), 'f281d3e74fa910671f4bd95f7afffcf1');
console.log('Verified homepage metadata, static HTML, robots.txt, single-URL sitemap and IndexNow key in dist.');
