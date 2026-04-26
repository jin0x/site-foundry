// B2 verification: per-section vertical padding.
// Usage: PAGE_URL=http://localhost:3000/new-project-homepage node measure-padding.mjs

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
  const sections = [...document.querySelectorAll('main section')];
  return sections.map((sec, idx) => {
    const cs = getComputedStyle(sec);
    const headings = [...sec.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const cls = (sec.className || '').toString();
    const tone = cls.match(/tone-(\w+)/)?.[1] || '(no-tone)';
    const py = cls.match(/\bpy-(\w+)/)?.[1] || '(no py-*)';
    return {
      idx,
      tone,
      pyClass: py,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      heading: headings[0]?.textContent.trim().slice(0, 60) || '(no heading)',
    };
  });
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
