// B3 verification: measure section bg + heading/description text colors
// for tone-accent sections (lime callouts).
// Usage: PAGE_URL=http://localhost:3000/new-project-homepage node measure-accent.mjs

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
  const sections = [...document.querySelectorAll('main section.tone-accent')];
  return sections.map((sec) => {
    const cs = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        text: el.textContent.trim().slice(0, 60),
        color: s.color,
        backgroundColor: s.backgroundColor,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
      };
    };
    const heading = sec.querySelector('h1, h2, h3');
    const paragraph = sec.querySelector('p');
    const button = sec.querySelector('a.inline-flex, button.inline-flex');
    return {
      sectionCls: (sec.className || '').toString().slice(0, 200),
      sectionBg: getComputedStyle(sec).backgroundColor,
      heading: cs(heading),
      description: cs(paragraph),
      button: cs(button),
    };
  });
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
