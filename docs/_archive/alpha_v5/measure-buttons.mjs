// Tier 2 focused re-measure: per-section button data.
// Captures bg color, border-radius, padding, text color, text content for every
// CTA-shaped element inside each top-level <main> section.
// Usage: PAGE_URL=http://localhost:3000/new-project-homepage node measure-buttons.mjs

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
  const cs = (el) => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      cls: (el.className || '').toString().slice(0, 200),
      backgroundColor: s.backgroundColor,
      color: s.color,
      borderRadius: s.borderRadius,
      borderWidth: s.borderTopWidth,
      borderColor: s.borderTopColor,
      paddingTop: s.paddingTop,
      paddingRight: s.paddingRight,
      paddingBottom: s.paddingBottom,
      paddingLeft: s.paddingLeft,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      text: el.textContent.trim().slice(0, 60),
    };
  };
  return sections.map((sec, idx) => {
    const headings = [...sec.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    /* CTA candidates: <button> + <a class="inline-flex"> (Button primitive renders
     * <a> with the inline-flex base class; this captures both button and href
     * variants while excluding plain text links). */
    const buttons = [
      ...sec.querySelectorAll('button.inline-flex'),
      ...sec.querySelectorAll('a.inline-flex'),
    ];
    return {
      idx,
      sectionCls: (sec.className || '').toString().slice(0, 200),
      firstHeadingText: headings[0]?.textContent.trim().slice(0, 80) || '(no heading)',
      buttonCount: buttons.length,
      buttons: buttons.slice(0, 6).map(cs),
    };
  });
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
