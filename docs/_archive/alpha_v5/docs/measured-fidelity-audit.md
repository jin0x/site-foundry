# Measured fidelity audit — workflow

A refinement of pipeline Stage 5 (Visual fidelity) that **replaces estimation with measurement**. Used after pages render in Stage 4. Produces per-section evidence (real computed styles + real Figma design specs) that scores the visual rubric mechanically, categorizes gaps by layer (token / primitive / block / content), and ranks fixes by leverage.

**Why this exists:** the original Stage 5 method had us scoring rubric rows from intuition + screenshot inspection. Two failure modes followed: (a) the rubric exempted axes that should have been scored (color/typography under "placeholder palette" framing), and (b) section-level fidelity numbers were estimates ±5–10pp. The PoC on AutoSwitchingCards (2026-04-25) showed that one measured pass produces concrete hex/px/weight evidence that decides the rubric without judgment calls.

**Source PoC:** `alpha_v5/screenshots/baseline-2026-04-25/POC-FINDINGS.md` — full evidence + diff for AutoSwitchingCards. Read this before starting a measurement pass to understand the output shape.

---

## Prerequisites

Before a measurement session begins, all five must be true:

1. **Dev server running** at `http://localhost:3000`. The pages whose sections you measure (`/new-project-homepage`, `/new-project-platform`) must HTTP 200.
2. **Bundled Chromium installed** for Playwright. Once-per-machine setup:
   ```bash
   npx playwright install chromium
   ```
   Resulting binary path: `/home/brock/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome` (version may differ — adjust path).
3. **Playwright MCP plugin configured** to use bundled Chromium. Edit both:
   - `~/.claude/plugins/cache/claude-plugins-official/playwright/unknown/.mcp.json`
   - `~/.claude/plugins/marketplaces/claude-plugins-official/external_plugins/playwright/.mcp.json`

   …to:
   ```json
   {
     "playwright": {
       "command": "npx",
       "args": ["@playwright/mcp@latest", "--executable-path", "/home/brock/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome"]
     }
   }
   ```
   Then `/reload-plugins` so the MCP server restarts with the new args. (If you skip this, you can still drive Chromium via a tiny `playwright-core` Node script — see step 2 of the per-section recipe — but the MCP browser tools won't work.)
4. **Design system tokens already extracted** to `alpha_v5/PROJECT_DESIGN_NODES.md`. Used as the canonical color/type/effect reference when scoring rubric rows.
5. **Section queue available** at `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` — provides the 13 Homepage + 11 Platform section nodeIds.

---

## Per-section recipe

For each section, run these five steps in order. Output: one per-section diff file in `alpha_v5/screenshots/baseline-<DATE>/<page>-section-<NN>-<slug>.md`. Time budget: ~10 minutes per section.

### Step 1 — Identify the section

From the queue file's section map, take:
- **Section number** (1–13 Homepage, 1–11 Platform)
- **Figma nodeId** (e.g. `7876:51954`)
- **Candidate block name** (e.g. `AutoSwitchingCards`, `HeroCentered`)
- **Slug** for filename (kebab-case the section name)

### Step 2 — Capture rendered styles + section screenshot via Playwright

Use the playwright-core script below. Saves a focused screenshot + JSON of computed styles for the section's key elements (heading, subheading, card title, card description, CTA).

Save to `alpha_v5/measure-section.mjs` (or reuse if already there). Edit the `SECTION_HEADING_TEXT` constant per section — pick a stable substring of the section's most-prominent heading, like `You've got` or `Dive into Documentation`.

```js
// alpha_v5/measure-section.mjs
import { chromium } from '/home/brock/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';

const PAGE_URL = process.env.PAGE_URL || 'http://localhost:3000/new-project-homepage';
const SECTION_HEADING_TEXT = process.env.HEADING || "You've got";
const OUT_PATH = process.env.OUT || '/home/brock/Design-to-code-chats/alpha_v5/screenshots/baseline-2026-04-25/section.png';

const browser = await chromium.launch({
  executablePath: '/home/brock/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome',
  args: ['--no-sandbox'],
});
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

const result = await page.evaluate((needle) => {
  const heading = [...document.querySelectorAll('h1, h2, h3')].find(h => h.textContent.includes(needle));
  if (!heading) return { error: `heading not found: ${needle}` };
  const section = heading.closest('section');
  const rect = section.getBoundingClientRect();
  const cs = (el) => {
    const s = getComputedStyle(el);
    return {
      fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight,
      lineHeight: s.lineHeight, color: s.color, backgroundColor: s.backgroundColor,
    };
  };
  const cardTitle = section.querySelector('h3');
  const cardDesc = cardTitle ? cardTitle.parentElement.querySelector('p') : null;
  const subheading = section.querySelector('div.text-prose-body p, .text-prose-body');
  const ctaBtn = section.querySelector('button, a[href]');
  return {
    sectionBoundsAbs: { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height },
    sectionBg: getComputedStyle(section).backgroundColor,
    heading: { ...cs(heading), text: heading.textContent.slice(0, 80) },
    subheading: subheading ? { ...cs(subheading), text: subheading.textContent.slice(0, 100) } : null,
    cardTitle: cardTitle ? { ...cs(cardTitle), text: cardTitle.textContent } : null,
    cardDesc: cardDesc ? { ...cs(cardDesc), text: cardDesc.textContent.slice(0, 80) } : null,
    ctaPresent: !!ctaBtn, ctaText: ctaBtn ? ctaBtn.textContent.trim().slice(0, 40) : null,
    pageBodyBg: getComputedStyle(document.body).backgroundColor,
    pageBodyFontFamily: getComputedStyle(document.body).fontFamily,
  };
}, SECTION_HEADING_TEXT);

console.log(JSON.stringify(result, null, 2));

if (result.sectionBoundsAbs && result.sectionBoundsAbs.width) {
  const bounds = result.sectionBoundsAbs;
  await page.evaluate((y) => window.scrollTo(0, y), bounds.y);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: OUT_PATH,
    clip: { x: bounds.x, y: 0, width: bounds.width, height: Math.min(bounds.height, 2000) },
  });
}
await browser.close();
```

Invoke per section:
```bash
PAGE_URL=http://localhost:3000/new-project-homepage \
  HEADING="You've got" \
  OUT=/home/brock/Design-to-code-chats/alpha_v5/screenshots/baseline-2026-04-25/homepage-section-08-autoswitching.png \
  node /home/brock/Design-to-code-chats/alpha_v5/measure-section.mjs
```

The JSON it logs is your **site evidence** — copy it into the per-section diff doc.

### Step 3 — Pull design intent via drill-in MCP

Try `get_design_context` directly first. If it returns "result exceeds maximum allowed tokens," fall back to `get_metadata` to find children, then drill into each child individually. If a leaf still exceeds: `get_screenshot` for visual reference.

```
mcp__figma__get_design_context  fileKey=Kd4MoDaQreiazP75Ujy8kt  nodeId=<sectionId>
```

If it succeeds, you get the design's React+Tailwind code with exact hex / px / weight + a rendered preview image. That's your **design evidence**.

If it fails with size ceiling:
```
mcp__figma__get_metadata  fileKey=Kd4MoDaQreiazP75Ujy8kt  nodeId=<sectionId>
```

Parse via Python (the metadata file the MCP saves to disk has line-numbered XML; `indent = (chars before <)` reveals the tree). Find direct children with their nodeIds, then `get_design_context` per child. Composed-graphic children that still exceed → `get_screenshot` for image-only reference.

The PoC walked this exact path on AutoSwitchingCards (`7876:51954`):
- `get_metadata` → 2 children (Section Pricing `7876:51955`, Grid `7876:51961`)
- Section Pricing `get_design_context` → succeeded (heading area code spec)
- Grid `get_metadata` → 2 children (left Card, right Card)
- Left Card `get_design_context` → succeeded (card list spec)
- Right Card `get_design_context` → exceeded → `get_screenshot` (visual ref)

### Step 4 — Score the rubric mechanically

Walk the 7-row rubric per section (from `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` § "Visual fidelity rubric"). For each row, compare site value vs design value using actual measurements, not impressions:

| Row | Pass criterion (now token-grounded) |
|---|---|
| 1 Layout structure | nesting / column count / split-row pattern matches Figma (±1 nesting tolerance kept) |
| 2 Typography size | size within 1 enum step OR larger-by-design (e.g. design uses 64px on a hero — primitive max 48px → ✗ unless `<Heading>` exposes Display sizes) |
| 3 Typography weight/family | family exact (IBM Plex Sans), weight exact (300/400/500/600/700) — both must match for ✓ |
| 4 Color | exact token match against PROJECT_DESIGN_NODES.md colors. ⚠ if site uses a token meant for the wrong tone (e.g. `--color-secondary` on inverse surface) |
| 5 Spacing | within ±4px (kept) — measure via `getComputedStyle().padding/margin` |
| 6 Content present | every Figma text/image rendered |
| 7 Affordance | CTAs / interactive elements present at right size + position |

**Exemption rule (corrected post-PoC):** the only exempt case is when a known Tier-2/3 gap from `alpha_v3/gap-triage-2026-04-22.md` directly explains the failure. Color and typography weight/family **are not exempt** — those are tokenized in `theme.css` and measurable.

### Step 5 — Write the per-section diff doc

Use the template at the bottom of this file. Save to `alpha_v5/screenshots/baseline-<DATE>/<page>-section-<NN>-<slug>.md`. Time-box this step — don't gold-plate prose; tables + concrete deltas are the deliverable.

---

## Pacing + session boundaries

- **Per-section budget:** ~10 min (Steps 1–5).
- **Per-session cap:** 6 sections (looser than the 4-frame build cap because measurement is read-only / lower cognitive load — but still respect coherence).
- **Hard cap:** 8 sections; stop and write a session handoff regardless.
- **Total measurement pass:** 25 sections (Homepage 14 + Platform 11) ≈ 4–5 sessions over 1–2 calendar days.

Session output per cap-stop:
- Per-section diff docs in `alpha_v5/screenshots/baseline-<DATE>/`
- Append a session-handoff block to a running log (suggest `alpha_v5/screenshots/baseline-<DATE>/SESSION-LOG.md`) noting which sections completed, which section nodes hit MCP-ceiling-twice (need second-level drill-in), and any new gap pattern observed across multiple sections.

---

## Aggregation (after all sections measured)

A separate session takes the 25 per-section diffs and produces:

1. **Corrected per-page rubric scores.** Aggregate of per-section row results. Replaces the estimated `~65% / ~70%` numbers with measured ones.
2. **Cross-section gap heatmap.** For each gap pattern (e.g. "card description uses `--color-secondary` on inverse-toned section"), count how many sections hit it. Frequency × severity = fix priority.
3. **Categorized gap list ranked by layer + leverage:**
   - **Token-level** (modify `packages/tokens/src/theme.css` — affects ALL sections): typically 2–4 items, highest leverage.
   - **Primitive-level** (e.g. `<Heading>` needs `weight` prop + Display sizes — affects every section that uses the primitive): 1–3 items, very high leverage.
   - **Block-level** (per-block React updates): 5–10 items.
   - **Schema-level / content-level** (icon seeds, video URLs, image uploads): 5–10 items.
4. **Updated retrospective** in the queue file with measured numbers replacing estimates.

Aggregation prompt is in `alpha_v5/session-prompts.md` (see "Measurement aggregation prompt" section).

---

## Failure modes + escalations

Encountered during the PoC; document any new ones in your session log.

| Symptom | Cause | Workaround |
|---|---|---|
| `get_design_context` returns "result exceeds maximum allowed tokens" | Section frame too dense (>~200KB JSON) | Drill via `get_metadata` → children → individual `get_design_context` per child |
| `get_metadata` ALSO exceeds ceiling | Section is genuinely huge (e.g. AutoSwitchingCards: 488KB metadata) | Read the persisted file via Python, parse XML for direct children with regex on indent levels |
| Both still exceed on a leaf | Composed graphic (per principle 3) | `get_screenshot` for image-only reference; don't try to ingest layer structure |
| Playwright MCP returns "Chromium distribution 'chrome' is not found at /opt/google/chrome/chrome" | Plugin started before `--executable-path` was added to its `.mcp.json` | Edit the `.mcp.json` files (both cache + marketplaces paths) → `/reload-plugins` |
| Headless Chromium prints DBus errors | WSL has no system bus; Chromium probes for it | Non-fatal — page still renders. Filter out `dbus|DBus` from logs |
| `page.evaluate()` returns `transparent` for section background | Background is on an ancestor (`<Section>` parent), not the section element | Walk up to `body` / nearest `[class*="bg-"]` ancestor; or just record "transparent — inherits inverse tone" if applicable |
| Heading not found by needle | Section uses different heading text than expected, or sectionHeading is disabled | Update needle to a more stable element — section eyebrow, first card title, or use nodeId-based `data-key` if present |

---

## Per-section diff template (copy this for each section)

```markdown
# <Page> — Section <N> — <Section name>

**Section nodeId (Figma):** `<fileKey>:<nodeId>`
**Block type rendered:** `<block.xxx>`
**Site URL:** `http://localhost:3000/<page-slug>` (scroll to ~y=<bounds.y>px)
**Date measured:** `<YYYY-MM-DD>`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading | | | | | |
| Subheading | | | | | |
| Card / item title | | | | | |
| Card / item description | | | | | |
| CTA | | | | | |
| Section bg | | | | | |

(Computed-style JSON, raw, in collapsible block if useful)

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `<id>` + child drill-ins as needed)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading | | | | | |
| Subheading | | | | | |
| (children) | | | | | |

(Inline preview image link if `get_screenshot` was used: `./<page>-section-<NN>-design.png`)

## Diff — site vs design

### Critical (visibly wrong, must fix)
| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| | | | | |

### Secondary (small drift)
| Element | Site | Design | Notes |
|---|---|---|---|
| | | | |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✓/✗/⚠ | |
| 2 | Typography — size | ✓/✗/⚠ | |
| 3 | Typography — weight/family | ✓/✗/⚠ | |
| 4 | Color | ✓/✗/⚠ | |
| 5 | Spacing | ✓/✗/⚠ | |
| 6 | Content present | ✓/✗/⚠ | |
| 7 | Affordance | ✓/✗/⚠ | |

**Score:** `<passed>/7`. Section pass: ✓ / ✗ (≥5/7 = pass).

## Gap categorization (this section)

- **Token-level:** *(any new token gaps, or token miscarriages)*
- **Primitive-level:** *(any primitive that needs a new prop / size / variant)*
- **Block-level:** *(specific changes to this block's React component)*
- **Schema/content-level:** *(missing schema fields or unseeded content)*

## Notes / surprises
- *(anything unexpected — design pattern this revealed, gap not previously flagged)*
```

---

## Audit-pass closing condition

The full pass is complete when:

- All 25 sections have a per-section diff doc.
- An aggregation pass has produced the corrected per-page rubric scores + categorized gap list.
- The queue file's "Honest rescore" section is updated with measured (not estimated) numbers.
- A "Fix priority order" doc lists token / primitive / block / content fixes ranked by leverage (count of sections affected × severity).

Then — and only then — fix work begins, in that priority order.
