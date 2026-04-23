# AI Voice Agents — Figma-to-seed mapping notes

**Source:** Figma file `ox8M7KAx62v6GmQPriJBmO`, node `757:5430` (SignalWire Internal — "MultiCode Section - Option C").

**Mapped to:** `block.featureGrid` → `seeds/ai-voice-agents-example.json`.

## What mapped cleanly

| Figma element                        | Seed field                            |
| ------------------------------------ | ------------------------------------- |
| Heading "AI Voice Agents"            | `sectionHeading.heading`              |
| Paragraph below heading              | `sectionHeading.subheading` (as PT)   |
| Left-aligned heading block           | `sectionHeading.align: "left"`        |
| Card: eyebrow + big number + copy    | `items[].eyebrow / .title / .description` |

## What was dropped or lossy

1. **Tabs (757:5435) — no schema support.** Figma has a 6-tab selector (`01 Real-time Translations` through `06 Conferencing`) above the stat cards. `block.featureGrid` has no concept of tabs or grouped content. The active tab's content is what we mapped; the other five tabs' content was never retrievable through this frame's MCP context anyway. **Implied schema gap:** we need either a `block.tabbedFeatures` type or a `groups` dimension on an existing block.

2. **Card count — schema enum too narrow.** Figma shows 4 stat cards in one row. `featureGridColumnOptions` only offers `2` and `3`. Chose `columns: 3` and dropped the 4th card (`99.99 %` uptime). **Implied schema gap:** add `4` to the column enum, or remove the enum entirely and let editors pick freely.

3. **Typographic emphasis — schema flattens it.** Figma renders the card `title` as 39px Instrument Sans SemiBold (it's the star of the card: `340 ms`, `18`, `2.5 Mb`). Schema's `items[].title` is a plain `string`; the `packages/ui` component will render all items uniformly with no way to declare "this title is the visual focus." **Implied component gap:** either a `variant` on featureGrid ("stat" vs. "capability") or a dedicated `block.statGrid`.

4. **Card container visual treatment — schema-invisible.** The Figma cards sit inside a single bordered container with a conic-gradient background and radius-8 corners. The schema has no per-block "container" concept. The current ui component renders cards against the page background. Cosmetic loss; content preserved.

## What stayed honest

- Card eyebrows and descriptions are lorem ipsum in the Figma. We passed them through verbatim rather than inventing plausible copy. This makes the rendered page visibly "from Figma placeholder data," which is more useful than a fake-polished demo for the next conversation about content workflow.
- Card titles (`340 ms`, `18`, `2.5 Mb`) look like real metric targets and stayed as-is.

## Phase 6 takeaways

Three concrete schema/component improvements fell out of this one frame:
1. Tabbed/grouped container block type.
2. Column enum extension (or removal) on `block.featureGrid`.
3. Title-emphasis variant or dedicated stat-grid block.

File a design-schema gap ticket upstream with this list when Phase 6 kicks off.
