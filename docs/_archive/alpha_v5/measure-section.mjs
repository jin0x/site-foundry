import { chromium } from '/home/brock/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';

const PAGE_URL = process.env.PAGE_URL || 'http://localhost:3000/new-project-homepage';
const SECTION_HEADING_TEXT = process.env.HEADING || '';
const HEADING_INDEX = parseInt(process.env.HEADING_INDEX || '0', 10);
const SECTION_INDEX = process.env.SECTION_INDEX ? parseInt(process.env.SECTION_INDEX, 10) : null;
const OUT_PATH = process.env.OUT || '/home/brock/Design-to-code-chats/alpha_v5/screenshots/baseline-2026-04-25/section.png';

const browser = await chromium.launch({
  executablePath: '/home/brock/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome',
  args: ['--no-sandbox'],
});
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

const result = await page.evaluate(({ needle, headingIdx, sectionIdx }) => {
  let section;
  if (sectionIdx != null) {
    const sections = [...document.querySelectorAll('section, main > div, [data-block]')];
    section = sections[sectionIdx];
    if (!section) return { error: `section index ${sectionIdx} not found (have ${sections.length})` };
  } else {
    if (!needle) return { error: 'no HEADING needle and no SECTION_INDEX provided' };
    const headings = [...document.querySelectorAll('h1, h2, h3')].filter(h =>
      h.textContent.toLowerCase().includes(needle.toLowerCase())
    );
    const heading = headings[headingIdx];
    if (!heading) return { error: `heading not found (needle="${needle}", idx=${headingIdx}, matches=${headings.length})`, candidates: headings.slice(0, 5).map(h => h.textContent.slice(0, 60)) };
    section = heading.closest('section') || heading.closest('[data-block]') || heading.parentElement.parentElement;
  }
  const rect = section.getBoundingClientRect();
  const cs = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      cls: (el.className || '').toString().slice(0, 120),
      fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight,
      lineHeight: s.lineHeight, color: s.color, backgroundColor: s.backgroundColor,
      padding: s.padding, margin: s.margin,
    };
  };
  // Walk ancestors to find an opaque background
  const findBg = (el) => {
    let cur = el;
    while (cur && cur !== document.documentElement) {
      const bg = getComputedStyle(cur).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        return { el: cur.tagName + '.' + (cur.className || '').toString().slice(0, 60), bg };
      }
      cur = cur.parentElement;
    }
    return { el: 'body', bg: getComputedStyle(document.body).backgroundColor };
  };
  const allHeadings = [...section.querySelectorAll('h1, h2, h3, h4')];
  const allParagraphs = [...section.querySelectorAll('p')];
  const allButtons = [...section.querySelectorAll('button, a[href]')];
  const allImages = [...section.querySelectorAll('img, svg')];
  const allInteractive = [...section.querySelectorAll('input, select, textarea, [role="tab"], [role="button"]')];

  return {
    sectionBoundsAbs: { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height },
    sectionTag: section.tagName.toLowerCase(),
    sectionCls: (section.className || '').toString().slice(0, 200),
    sectionBgChain: findBg(section),
    sectionPadding: getComputedStyle(section).padding,
    headings: allHeadings.map(h => ({ ...cs(h), text: h.textContent.trim().slice(0, 100) })),
    paragraphs: allParagraphs.slice(0, 8).map(p => ({ ...cs(p), text: p.textContent.trim().slice(0, 100) })),
    buttons: allButtons.slice(0, 8).map(b => ({ ...cs(b), text: b.textContent.trim().slice(0, 60) })),
    imageCount: allImages.length,
    interactiveCount: allInteractive.length,
    pageBodyBg: getComputedStyle(document.body).backgroundColor,
    pageBodyFontFamily: getComputedStyle(document.body).fontFamily,
  };
}, { needle: SECTION_HEADING_TEXT, headingIdx: HEADING_INDEX, sectionIdx: SECTION_INDEX });

console.log(JSON.stringify(result, null, 2));

if (result.sectionBoundsAbs && result.sectionBoundsAbs.width) {
  const bounds = result.sectionBoundsAbs;
  await page.evaluate((y) => window.scrollTo(0, y), bounds.y);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: OUT_PATH,
    clip: { x: Math.max(0, bounds.x), y: 0, width: bounds.width, height: Math.min(bounds.height, 2000) },
  });
}
await browser.close();
