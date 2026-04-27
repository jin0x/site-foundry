'use client';

import type {
  ImageWithAltValue,
  TabbedFeaturesBlock as TabbedFeaturesBlockProps,
  TabbedFeaturesContent,
} from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Grid } from '../../primitives/Grid';
import { GridGap, type GridCols } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize } from '../../primitives/Heading/heading-types';
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../primitives/Tabs';
import { AccordionBlockContent } from '../AccordionBlock/AccordionBlock';
import { CodeSampleBlockContent } from '../CodeSampleBlock/CodeSampleBlock';
import { UseCaseListBlockContent } from '../UseCaseListBlock/UseCaseListBlock';

function renderNestedContent(
  nested: TabbedFeaturesContent,
  key: string,
  groupFeaturedMedia?: ImageWithAltValue | null,
) {
  switch (nested._type) {
    case 'block.accordion':
      return <AccordionBlockContent key={key} {...nested} />;
    case 'block.codeSample':
      return <CodeSampleBlockContent key={key} {...nested} />;
    case 'block.useCaseList':
      /* Group-level featuredMedia (set on the tabbedFeatures group) takes
       * priority over any nested useCaseList.featuredMedia. Lives on the
       * group so the seed-apply pipeline's `arrayField: 'groups'` image
       * resolution can reach it. */
      return (
        <UseCaseListBlockContent
          key={key}
          {...nested}
          featuredMedia={groupFeaturedMedia ?? nested.featuredMedia}
        />
      );
    default:
      return null;
  }
}

export function TabbedFeaturesBlock(props: TabbedFeaturesBlockProps) {
  const groups = props.groups ?? [];
  if (!groups.length) return null;
  const rootKey = props._key ?? props._type;
  /* P6 single-tab mode: when there's only one group, hide the tab strip
   * entirely (no UI affordance to switch). The group label still renders
   * as a panel header above the content. Pl 9 'By Industry' uses this. */
  const singleTab = groups.length === 1;

  return (
    <BaseBlock block={props} framed>
      <Tabs defaultValue={groups[0].label} variant="underline">
        {singleTab ? null : (
          <TabsList>
            {groups.map((group, i) => (
              <TabsTrigger key={`${rootKey}-tab-${i}`} value={group.label}>
                {group.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {groups.map((group, groupIdx) => {
          const content = group.content ?? [];
          // useCaseList already lays out as 2-col internally — don't wrap in another 2-col Grid.
          const hasUseCaseList = content.some((c) => c._type === 'block.useCaseList');
          const cols: GridCols =
            hasUseCaseList
              ? 1
              : content.length > 1
                ? { mobile: 1, tablet: 1, desktop: 2 }
                : 1;
          return (
            <TabsContent key={`${rootKey}-pane-${groupIdx}`} value={group.label}>
              <Stack gap={StackGap.LG}>
                {/* P6 panel header: 32px Regular header reflecting active
                 * group label inside the panel content. Decisions design
                 * shows the active tab name re-asserted at the top of its
                 * panel (e.g. "By Industry" repeats above the list). */}
                <Heading as="h3" size={HeadingSize.H3}>
                  {group.label}
                </Heading>
                <Grid cols={cols} gap={GridGap.LG} className="items-start">
                  {content.map((nested, i) =>
                    renderNestedContent(
                      nested,
                      `${rootKey}-pane-${groupIdx}-${i}`,
                      group.featuredMedia,
                    ),
                  )}
                </Grid>
              </Stack>
            </TabsContent>
          );
        })}
      </Tabs>
    </BaseBlock>
  );
}
