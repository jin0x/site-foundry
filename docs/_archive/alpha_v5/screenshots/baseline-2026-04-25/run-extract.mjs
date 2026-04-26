import { chromium } from '/home/brock/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';
const browser = await chromium.launch({ executablePath: '/home/brock/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/new-project-homepage', { waitUntil: 'networkidle', timeout: 30000 });
const result = await page.evaluate(() => {
  const heading = [...document.querySelectorAll('h2')].find(h => h.textContent.includes("You've got"));
  if (!heading) return { error: 'heading not found' };
  const section = heading.closest('section');
  const rect = section.getBoundingClientRect();
  const cs = (el) => {
    const s = getComputedStyle(el);
    return { fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, color: s.color, backgroundColor: s.backgroundColor };
  };
  const cardTitle = section.querySelector('h3');
  const cardDesc = cardTitle ? cardTitle.parentElement.querySelector('p') : null;
  const subheading = section.querySelector('div.text-prose-body p, .text-prose-body');
  const ctaBtn = section.querySelector('button, a[href]');
  return {
    sectionBoundsAbs: { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height },
    sectionBg: getComputedStyle(section).backgroundColor,
    heading: cs(heading),
    headingText: heading.textContent,
    subheading: subheading ? { ...cs(subheading), text: subheading.textContent.slice(0, 100) } : null,
    cardTitle: cardTitle ? { ...cs(cardTitle), text: cardTitle.textContent } : null,
    cardDesc: cardDesc ? { ...cs(cardDesc), text: cardDesc.textContent.slice(0, 80) } : null,
    ctaPresent: !!ctaBtn,
    ctaText: ctaBtn ? ctaBtn.textContent.trim() : null,
    pageBodyBg: getComputedStyle(document.body).backgroundColor,
    pageBodyFontFamily: getComputedStyle(document.body).fontFamily,
  };
});
console.log(JSON.stringify(result, null, 2));

// Also take a focused screenshot of just the section
const bounds = result.sectionBoundsAbs;
if (bounds && bounds.width) {
  await page.evaluate((y) => window.scrollTo(0, y), bounds.y);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: '/home/brock/Design-to-code-chats/alpha_v5/screenshots/baseline-2026-04-25/autoswitching-section.png',
    clip: { x: bounds.x, y: 0, width: bounds.width, height: Math.min(bounds.height, 2000) },
  });
}
await browser.close();
