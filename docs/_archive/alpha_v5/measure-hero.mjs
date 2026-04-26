// B12 verification: measure hero section width + bg-image element width.
// Usage: PAGE_URL=http://localhost:3000/new-project-homepage node measure-hero.mjs

import { chromium } from '/home/brock/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';

const PAGE_URL = process.env.PAGE_URL || 'http://localhost:3000/new-project-homepage';

const browser = await chromium.launch({
  executablePath: '/home/brock/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome',
  args: ['--no-sandbox'],
});
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

const result = await page.evaluate(() => {
  const heroSec = document.querySelector('main section.min-h-\\[600px\\]');
  if (!heroSec) return { error: 'no hero section found' };
  const rect = heroSec.getBoundingClientRect();
  const cs = getComputedStyle(heroSec);
  const bgDiv = heroSec.querySelector('div.bg-cover');
  const bgRect = bgDiv?.getBoundingClientRect();
  return {
    heroWidth: rect.width,
    heroHeight: rect.height,
    heroMaxWidth: cs.maxWidth,
    heroPaddingLeft: cs.paddingLeft,
    heroPaddingRight: cs.paddingRight,
    bgImageWidth: bgRect?.width ?? null,
    bgImageHeight: bgRect?.height ?? null,
    viewportWidth: window.innerWidth,
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
