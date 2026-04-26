// B1 verification: detect outer chrome (border + bg-white) on the 4 framed blocks.
// Usage: PAGE_URL=http://localhost:3000/new-project-homepage node measure-chrome.mjs

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
    const heading = sec.querySelector('h1, h2, h3, h4, h5, h6');
    /* Look for the chrome wrapper inside the section's Container — it's the
     * div that has the border + bg-white classes. */
    const chrome = sec.querySelector('div.border.bg-\\[var\\(--color-surface-page\\)\\]');
    const cs = chrome ? getComputedStyle(chrome) : null;
    const sectCs = getComputedStyle(sec);
    return {
      idx,
      heading: heading?.textContent.trim().slice(0, 50) || '(no heading)',
      sectionPaddingTop: sectCs.paddingTop,
      sectionPaddingBottom: sectCs.paddingBottom,
      hasChrome: !!chrome,
      chromeBorder: cs?.borderTopWidth ? `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` : null,
      chromeBg: cs?.backgroundColor || null,
      chromePadTop: cs?.paddingTop || null,
      chromePadBottom: cs?.paddingBottom || null,
      chromePadLeft: cs?.paddingLeft || null,
    };
  });
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
