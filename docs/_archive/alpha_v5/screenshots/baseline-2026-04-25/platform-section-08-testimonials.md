# Platform — Section 8 — Testimonials carousel

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7908:136870`
**Block type rendered:** `block.testimonials` (carousel)
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=4608px, h=992)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Trusted by organizations..." | IBM Plex Sans | 30px | 400 | rgb(10,10,12) | `<h2>` `text-h2 font-normal` |
| Card 1 author "Operations Leader" | IBM Plex Sans | 16px | 400 | rgb(10,10,12) | `<p>` `text-body text-[var(--color-primary)]` — **placeholder seed leaks** |
| Card 1 role "Interview" | IBM Plex Sans | 14px | 400 | rgba(31,41,55,0.8) | `text-small text-[var(--color-secondary)]` |
| Card 2 author "Paul Jones" | IBM Plex Sans | 16px | 400 | rgb(10,10,12) | `<p>` |
| Card 2 role "IT, Pantheon" | IBM Plex Sans | 14px | 400 | rgba(31,41,55,0.8) | |
| Card 3 quote | IBM Plex Sans | 24px | 400 | rgb(10,10,12) | `<p>` `text-h3 text-[var(--color-primary)]` — quote text |
| Card 3 author "Henry Espinosa" | IBM Plex Sans | 16px | 400 | rgb(10,10,12) | |
| Card 3 role "City of Miami Parking Authority" | IBM Plex Sans | 14px | 400 | rgba(31,41,55,0.8) | |
| Buttons (5) | — | — | — | — | 2 play buttons (no text) + 3 dot pagination buttons (1 active black, 2 inactive gray) |
| Section bg | — | — | — | transparent | inherits page body |
| Section padding | — | — | — | — | `16px 0px` (py-4) |
| Section height | — | — | — | — | 992px (close to design ~1000) |

```json
{
  "imageCount": 2,
  "interactiveCount": 0,
  "buttons[2]": {"cls": "w-2 h-2 rounded-full bg-[var(--color-primary)]", "backgroundColor": "rgb(10, 10, 12)"},
  "buttons[3-4]": {"cls": "w-2 h-2 rounded-full bg-[var(--color-secondary)] opacity-40", "backgroundColor": "rgba(31, 41, 55, 0.8)"}
}
```

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on `7908:136870` — succeeded directly.)

**Container:** `bg-white border #e8e8e8` (Section Features)

**Header** (`7908:136871`, `pb-64 pt-48 px-64 gap-48`):
- Heading: IBM Plex Sans Light 300, 64px (Heading/H1), `#0A0A0C`, leading 1.1, w-1368
- No subheading

**Carousel** (`7908:136877`, `gap-40 h-660`): 3 cards × 720w × 661h, `pb-48` outer, `gap-32`

**Card 1** (`7908:136878`, photo bg "Darris Hampton MidFirst Bank"):
- bg: photo image `imgTestimonial` (full-bleed, scaled 137.69%)
- Play button: 75px size, positioned bottom-right
- Shading gradient: black 0.9 → 0 from 132° angle (mix-blend-multiply)
- MidFirst Bank brand logo: 225×29 image
- Author "Darris Hampton": 24px Regular white, leading 1.3
- Role "MidFirst Bank": 18px Regular `rgba(255,255,255,0.7)` (white @ 70%)
- p-64

**Card 2** (`7908:136938`, photo bg "Paul Jones IT Pantheon"): same chrome with author "Paul Jones" + role "IT, Pantheon"

**Card 3** (`7908:136961`, **Navy bg `#00274d`**, no photo):
- bg: `#00274d` Navy
- Logomark watermark: 732px decorative, behind content
- Quote text: 32px IBM Plex Sans Regular, white, leading 1.3, hanging-indent for opening quote mark
- Author block: MPA logo (61px) + "Henry Espinosa" (24px white) + "City of Miami Parking Authority" (18px white @ 70%)
- p-64

**Dots** (`7908:136985`): single image asset h-10 w-88, **4 dots** total (2.5px gap based on width).

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 64px (H1) | −34px / −53% | Token + Primitive |
| Heading weight | 400 | 300 (Light) | weight off | Primitive |
| **Card 1 author** | "Operations Leader" / "Interview" | "Darris Hampton" / "MidFirst Bank" | **wrong content — placeholder seed leaks** | **Schema/seed** — same as Homepage Section 11 |
| Card photo bgs (cards 1+2) | absent (`imageCount: 2` — likely just 2 brand logos + dots) | full-bleed photo bg w/ shading gradient + play overlay + brand logo | **DOMINANT visual mass missing** | Block + Schema/content |
| Card 3 Navy bg | absent (transparent) | `#00274d` Navy | bg color missing | Block + Schema |
| Card 3 logomark watermark | absent | 732px decorative logomark watermark behind content | structural decorative | Schema/content |
| Quote text size | 24px (`text-h3`) | 32px | −8px | Token — design uses dedicated 32px size, not in current scale |
| Author name size (all cards) | 16px (`text-body`) | 24px | −8px / −33% | Block — author template size wrong |
| Author role size | 14px | 18px (H5) | −4px | Block + Token |
| Author role color (in dark-bg cards) | `rgba(31,41,55,0.8)` Tailwind gray | `rgba(255,255,255,0.7)` white @ 70% | wrong tone-flip | Block — author block doesn't tone-flip on inverse bg |
| Author name color (in dark-bg cards) | `rgb(10,10,12)` dark | `white` | wrong tone-flip | Block — author block doesn't tone-flip on inverse bg |
| Dots count | 3 | 4 | −1 | Schema — testimonials items array missing one |
| Dots rendering | 3 inline buttons w/ rounded-full bg | single image asset (h-10 w-88) | rendering style differs | Block (acceptable variant) |
| Section bg + chrome | transparent | `bg-white border #e8e8e8` | white card chrome missing | Block |
| Section padding | `16px 0px` (py-4) | header `pb-64 pt-48 px-64` + `pb-48` carousel | dramatically thin | Block |
| Per-card padding | unknown | `p-[64px]` | inner padding missing | Block |

### Secondary (small drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Card width 720 | unknown | 720 | likely doesn't match (carousel layout) |
| Section height 992 | 992 | ~1000 | close ✓ |
| Quote color (rgb(10,10,12)) | dark | white (on Navy bg) | fails tone-flip — same issue as author color |
| Carousel infrastructure | 3 cards + dots present | 3 cards + dots in design | infrastructure ✓ |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 3-card carousel + dots present, but per-card photo+gradient layering absent |
| 2 | Typography — size | ✗ | Heading 30 vs 64; author 16 vs 24; quote 24 vs 32; role 14 vs 18 |
| 3 | Typography — weight/family | ✗ | Heading 400 vs 300; family ✓ |
| 4 | Color | ✗ | Author/role/quote colors don't tone-flip on inverse-bg cards (white expected, dark rendered); `--color-secondary` wrong |
| 5 | Spacing | ✗ | py-4 vs pb-64 pt-48 px-64 + per-card p-64 |
| 6 | Content present | ✗ | Card 1 author seed wrong (placeholder); 2 photo bgs absent; Card 3 Navy bg absent; Logomark watermark absent; 4th dot/item missing |
| 7 | Affordance | ✓ | 2 play buttons + 3 dots present; clickable. ✓ |

**Score:** `1/7` (with ⚠ as ✗). **Section pass:** ✗.

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` (recurring).
  - Heading-token-name collision (recurring).
  - **NEW:** No 32px text-size token. Design uses 32px for quote (between H3=24 and H2=48 in current scale). Either add as `text-quote-32` or use H3 with a one-off override.
- **Primitive-level:**
  - `<Heading>` no `weight` (recurring) / no Display/64.
- **Block-level:**
  - `block.testimonials` author block doesn't tone-flip color on inverse-bg cards (text stays dark on Navy).
  - Per-card `p-64` not applied.
  - Per-card photo bg + gradient overlay + play button + brand-logo composition not implemented.
  - Card 3 Navy-bg variant + logomark watermark not implemented.
  - Quote text size hardcoded to `text-h3` 24px instead of 32.
- **Schema/content-level:**
  - **Card 1 author seed leaks placeholder** ("Operations Leader" / "Interview") — same as Homepage Section 11 first-card seed.
  - 2 testimonial photo bg images not seeded.
  - Card 3 logomark watermark not seeded.
  - 2 brand logos (MidFirst Bank, IT Pantheon) not seeded.
  - 4th testimonial missing — design has 4 dots, site has 3.
- **Functional/animation:**
  - Carousel auto-scroll likely not implemented (per Homepage Section 11 finding).

## Notes / surprises

- **Direct parallel of Homepage Section 11.** Same gaps almost line-for-line:
  - Photo bgs absent
  - Navy-bg card 3 absent
  - Brand logos + logomark watermark absent
  - First-card seed wrong (Operations Leader/Interview vs Darris Hampton/MidFirst Bank)
  - 3 dots vs 4 in design
  - Tone-flip wrong on inverse cards
- **Identical first-card placeholder leak to Homepage 11** strongly suggests **the Stage-2 seed pipeline reuses the same testimonials block source twice**, and the placeholder is upstream of the per-page seed. Worth investigating whether `testimonials` schema has a per-page items override that's failing to populate.
- **Quote text size 32px** exposes a token gap not yet flagged: there's no 32px slot in the current `text-h{n}` scale (jumps 24→48). Adding `text-quote` or `text-h2-5` or moving 32 into Heading/H3 (instead of 24) would help.
- **Dots rendering as 3 separate buttons** vs design's single image asset is acceptable (the buttons are clickable and the image is decorative). The 3-vs-4 count is the real issue.
- **Tone-flip failure on author block** is interesting because the heading and quote already correctly use white on inverse contexts elsewhere. The author block specifically (name + role compound) seems to be the offender — likely a per-block React template that doesn't read `tone` prop.
