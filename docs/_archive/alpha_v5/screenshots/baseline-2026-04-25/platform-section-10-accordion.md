# Platform — Section 10 — Accordion + Sidebar (FAQ)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7908:137059`
**Block type rendered:** `block.accordion` (with sidebar support card)
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=6156px)
**Date measured:** `2026-04-25`
**Mirrors:** Homepage Section 12 (identical schema, identical FAQ copy)

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading `<h3>` "Questions? We've got answers." | IBM Plex Sans | 30px | 400 | #0a0a0c | `text-h2 font-normal` — single string, **no two-tone split** |
| "Need help?" `<p>` | IBM Plex Sans | 16px | 400 | #0a0a0c | `text-body text-[var(--color-primary)]` — primary OK |
| Sidebar sub-text `<p>` | IBM Plex Sans | 14px | 400 | rgba(31,41,55,0.8) | `text-small text-[var(--color-secondary)]` — **secondary token bug + Degular Demo not loaded** (design wants 12px Degular Demo) |
| Accordion question `<button>` ×5 | IBM Plex Sans | 16px | 500 (Medium) | #0a0a0c | `font-medium`, p-20, `flex w-full items-center justify-between` |
| "Chat with support" CTA `<a>` | IBM Plex Sans | 16px | 500 | #0a0a0c on rgb(0,128,255) | rounded-full Bright Blue pill — **wrong tone (should be navy white-text)** |
| Section bg | — | — | — | transparent (body) | — |
| Section padding | — | 16px 0px | — | — | `relative py-4` |

Section bounds: `1920 × 510px`. ImageCount: 5. InteractiveCount: 0 (accordions are `<button>` not role=tab).

## Design (Figma) — measured via `get_design_context` on `7908:137059`

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading "Questions?" line 1 | IBM Plex Sans Light | 48px (Heading/H2) | 300 | #0a0a0c | leading-1.1 |
| Heading "We've got answers." line 2 | IBM Plex Sans Light | 48px (Heading/H2) | 300 | rgba(10,10,12,0.6) | **two-tone span** with Muted color, line break |
| Section bg | — | — | — | white #ffffff | border #e8e8e8 outer |
| Left column | — | w-600 | — | — | p-64, justify-between (heading top, support card bottom) |
| Support card | — | w-220 | — | bg #fafafa | border #e8e8e8, p-20, gap-16, `Light/Background/Muted #2` |
| Sidebar avatar+dot | — | size-40 image with size-10 green dot overlay | — | — | rounded-454.5 (full circle) |
| "Need help?" | IBM Plex Sans Regular | 16px (Heading/H6) | 400 | #0a0a0c | leading-1.4 |
| Sidebar sub-text | **Degular Demo Regular** | 12px (Text/XSmall) | 400 | rgba(10,10,12,0.6) | leading-1.6 |
| "Chat with support" button | IBM Plex Sans Regular | 14px | 400 | white on #00274d (Navy) | px-20 py-14 (rectangular, NOT rounded-full) |
| Vertical divider | — | w-1 | — | bg #e8e8e8 | self-stretch between Left + Right |
| Right column (Questions) | — | flex-1 | — | — | gap-0 |
| Accordion item border-t | — | 1px | — | #e8e8e8 | top border per item |
| Accordion header (open, item 1) | IBM Plex Sans Regular | 18px (Heading/H5) | 400 | #0a0a0c | bg #fafafa, p-32, with size-16 ph:plus icon (rotated to minus when open) |
| Accordion header (closed, items 2-5) | IBM Plex Sans Regular | 18px (Heading/H5) | 400 | #0a0a0c | p-32, bg-transparent, size-16 ph:plus icon |
| Accordion content (item 1 open) | IBM Plex Sans Regular | 16px | 400 | rgba(10,10,12,0.6) | bg-white, border-t #e8e8e8, p-32 |

## Diff — site vs design

### Critical
| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 48px | -18px (-37%) | **Token** — `text-h2` = 30 vs Heading/H2 = 48 |
| Heading weight | 400 Regular | 300 Light | wrong | **Primitive** — `<Heading>` no `weight` prop |
| Two-tone heading split | single span | "Questions?" / "We've got answers." with second line at 60% opacity | missing | **Primitive** — `<Heading>` accepts plain string only |
| Accordion question weight | 500 Medium | 400 Regular | wrong | **Primitive/Block** — accordion-header forced `font-medium` |
| Accordion question size | 16px | 18px (Heading/H5) | -2px | **Token** — no slot for 18 between 16 (h6) and 20 (h4) |
| "Chat with support" CTA | rounded-full Bright Blue (#0080ff), dark text | rectangular Navy (#00274d), white text | wrong shape, wrong tone | **Primitive** — `<Button shape='rectangular' variant='navy'>` missing |
| Sidebar sub-text font | IBM Plex Sans 14px | **Degular Demo** 12px | wrong family + size | **Token + asset** — Degular Demo not loaded; sub-text font scale missing |
| Sidebar sub-text color | `--color-secondary` (resolves to rgba(31,41,55,0.8) Tailwind gray) | rgba(10,10,12,0.6) (Light/Text 60%) | wrong base | **Token** |
| Section bg + outer border | transparent / none | white + border #e8e8e8 | missing | **Block** — chrome absent |
| Section padding | 16px 0 | (block has its own internal Left p-64 / Right gap-32) | thin | **Block** |
| Sidebar avatar+dot | absent (might be in imageCount=5) | size-40 photo + size-10 green dot overlay | likely missing | **Block + Schema** — dot overlay not in seed |
| Vertical divider | not present | w-1 #e8e8e8 self-stretch | missing | **Block** — left/right column separator |
| Accordion item bg (open) | bg-transparent | bg #fafafa for header when open | missing | **Block** — open-state bg accent |

### Secondary
| Element | Site | Design | Notes |
|---|---|---|---|
| Heading semantic level | `<h3>` | h2 (Heading/H2 token) | semantic vs styling drift; design uses Heading/H2 token but tag could be either |
| Accordion content (item 1) | (rendered, present) | bg-white border-t p-32 | likely OK in styling; deeper inspection not done |
| 5 accordion items, all questions | matches text exactly | matches | ✓ |

## Rubric scoring

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | Sidebar+accordion split-row works (best layout match yet); but vertical divider missing, support card position correct, vertical layout correct |
| 2 | Typography — size | ✗ | Heading 30 vs 48; question 16 vs 18 (close but token-scale gap); sub-text 14 vs 12 |
| 3 | Typography — weight/family | ✗ | Heading 400 vs 300; question 500 vs 400; **sub-text Plex vs Degular Demo** |
| 4 | Color | ✗ | Secondary token wrong; "Chat" button Bright Blue vs Navy |
| 5 | Spacing | ⚠ | py-4 thin but block has internal p-64 on Left and p-32 on accordion; partial match |
| 6 | Content present | ✓ | All 5 questions, support card, "Need help?", sub-text, CTA all present (avatar+dot likely in imageCount=5) |
| 7 | Affordance | ⚠ | CTA present at right size, expandable buttons render; expected open-on-load behavior not verified, plus-icon rotation likely missing |

**Score:** `1/7` strict. Section pass: ✗.

## Gap categorization

- **Token-level:** `--color-secondary` wrong base (universal); `text-h{n}` collision: H2 = 30 vs 48 (universal), no 18px slot, no 12px slot; **Degular Demo font asset not loaded** (recurs from Section 12 + P1).
- **Primitive-level:** `<Heading>` weight prop + two-tone span; `<Button>` rectangular + Navy variant; `<Button>` font-weight 400 not 500.
- **Block-level:** `block.accordion` needs (a) outer card chrome (border + bg-white), (b) vertical divider between Left + Right, (c) open-state bg-#fafafa on header, (d) sidebar avatar with green-dot overlay, (e) plus→minus icon rotation, (f) `font-normal` on accordion question, not `font-medium`.
- **Schema/content-level:** sidebar avatar dot/status indicator not modeled.

## Notes / surprises

- This is the **best content-completeness** so far on Platform — all 5 questions, sidebar, "Need help?", sub-text, CTA — but typography + chrome + button gaps still drag rubric to 1/7.
- Identical to Homepage Section 12 in every respect (same FAQ copy, same support card, same gap pattern). Confirmed parallel — fixes here propagate to Homepage 12 1:1.
- The accordion question `font-medium` (500) is the only place the Block hardcodes weight differently from `<Heading>`. Could be intentional (clickable affordance hint), but design uses 400 Regular consistently.
- `interactiveCount: 0` despite 5 expandable buttons — `<button>` is captured in `buttons[]` but doesn't have `role="tab"` so it doesn't count. Not a concern.
- Sub-text uses `Degular Demo` 12px — third confirmed instance of this font (Section 12, P1, P10). Designer call still pending. Confirmed parallel scale: XSmall 12 + Medium 18 in Degular Demo.
