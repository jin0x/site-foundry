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
  const sec = document.querySelector('main section.tone-accent');
  if (!sec) return { error: 'no .tone-accent section' };
  const btn = sec.querySelector('a.inline-flex, button.inline-flex');
  if (!btn) return { error: 'no button' };
  const cs = getComputedStyle(btn);
  return {
    fullClassList: btn.className,
    color: cs.color,
    bgColor: cs.backgroundColor,
    /* Also check the resolved value of --color-inverse at the button's location */
    resolvedInverseVar: cs.getPropertyValue('--color-inverse').trim(),
    resolvedNavyVar: cs.getPropertyValue('--color-navy-100').trim(),
    resolvedPrimaryVar: cs.getPropertyValue('--color-primary').trim(),
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
