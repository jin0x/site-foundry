'use client';

import { useState } from 'react';
import type { TabbedFeaturesBlock as TabbedFeaturesBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { cx } from '../../lib/cx';
import { AccordionBlockContent } from '../AccordionBlock/AccordionBlock';
import { CodeSampleBlockContent } from '../CodeSampleBlock/CodeSampleBlock';

export function TabbedFeaturesBlock(props: TabbedFeaturesBlockProps) {
  const groups = props.groups ?? [];
  const [activeIdx, setActiveIdx] = useState(0);

  if (!groups.length) return null;
  const activeGroup = groups[Math.min(activeIdx, groups.length - 1)];
  const activeContent = activeGroup.content ?? [];

  return (
    <BaseBlock block={props}>
      <div className="flex flex-col gap-10 items-center">
        <div
          role="tablist"
          className="inline-flex gap-1 rounded-full border border-[var(--color-code-border)] bg-[var(--color-surface-raised)] p-1"
        >
          {groups.map((group, i) => {
            const selected = i === activeIdx;
            return (
              <button
                key={`${props._key ?? props._type}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIdx(i)}
                className={cx(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  selected
                    ? 'bg-[var(--color-primary)] text-[var(--color-inverse)]'
                    : 'text-[var(--color-tertiary)] hover:text-[var(--color-primary)]',
                )}
              >
                {group.label}
              </button>
            );
          })}
        </div>
        <div
          role="tabpanel"
          className={cx(
            'w-full grid gap-8',
            activeContent.length > 1 ? 'lg:grid-cols-2 items-start' : 'grid-cols-1',
          )}
        >
          {activeContent.map((nested, i) => {
            const key = `${props._key ?? props._type}-pane-${activeIdx}-${i}`;
            switch (nested._type) {
              case 'block.accordion':
                return <AccordionBlockContent key={key} {...nested} />;
              case 'block.codeSample':
                return <CodeSampleBlockContent key={key} {...nested} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </BaseBlock>
  );
}
