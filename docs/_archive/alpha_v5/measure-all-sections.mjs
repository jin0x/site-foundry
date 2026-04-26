// Batch re-measure all sections on a page in one browser session.
// Used for focused Tier-N re-measurement (rows 2/3/4 only).
// Usage: PAGE_URL=http://localhost:3000/new-project-homepage node measure-all-sections.mjs

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
  // Restrict to direct pageBuilder sections — the layout always nests pageBuilder
  // blocks under <main>, so look for top-level <section> tags only.
  const sections = [...document.querySelectorAll('main section')];
  const cs = (el) => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      cls: (el.className || '').toString().slice(0, 160),
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      text: el.textContent.trim().slice(0, 80),
    };
  };
  return sections.map((sec, idx) => {
    const headings = [...sec.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const paragraphs = [...sec.querySelectorAll('p')];
    return {
      idx,
      sectionCls: (sec.className || '').toString().slice(0, 200),
      firstHeadingText: headings[0]?.textContent.trim().slice(0, 80) || '(no heading)',
      headings: headings.slice(0, 6).map(cs),
      paragraphs: paragraphs.slice(0, 4).map(cs),
    };
  });
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
