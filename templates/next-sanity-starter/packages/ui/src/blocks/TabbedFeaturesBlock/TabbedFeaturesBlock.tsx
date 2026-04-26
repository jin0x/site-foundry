'use client';

import type {
  ImageWithAltValue,
  TabbedFeaturesBlock as TabbedFeaturesBlockProps,
  TabbedFeaturesContent,
} from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Grid } from '../../primitives/Grid';
import { GridGap, type GridCols } from '../../primitives/Grid/grid-types';
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

  return (
    <BaseBlock block={props} framed>
      <Tabs defaultValue={groups[0].label}>
        <TabsList>
          {groups.map((group, i) => (
            <TabsTrigger key={`${rootKey}-tab-${i}`} value={group.label}>
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>
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
              <Grid cols={cols} gap={GridGap.LG} className="items-start">
                {content.map((nested, i) =>
                  renderNestedContent(
                    nested,
                    `${rootKey}-pane-${groupIdx}-${i}`,
                    group.featuredMedia,
                  ),
                )}
              </Grid>
            </TabsContent>
          );
        })}
      </Tabs>
    </BaseBlock>
  );
}
