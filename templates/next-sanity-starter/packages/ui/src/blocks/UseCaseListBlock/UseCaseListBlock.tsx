import type { UseCaseListBlock as UseCaseListBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize } from '../../primitives/Heading/heading-types';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

/**
 * Inner render — omits the BaseBlock section shell so this can be composed
 * inside tabbedFeatures tab panes without double-wrapping padding.
 */
export function UseCaseListBlockContent(props: UseCaseListBlockProps) {
  const items = props.items ?? [];
  if (!items.length && !props.featuredMedia?.asset?.url) return null;

  return (
    <Grid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap={GridGap.XL} className="items-start">
      <Stack gap={StackGap.NONE}>
        {items.map((item, index) => {
          const rowClass = 'flex items-center justify-between py-3 border-b border-[var(--color-surface-raised)]';
          const labelClass = item.active ? 'font-semibold' : 'text-[color:var(--color-secondary)]';
          const arrowSvg = (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
          const content = (
            <>
              <Text as="span" size={TextSize.LG} className={labelClass}>
                {item.label}
              </Text>
              <span aria-hidden="true" className="opacity-70">
                {arrowSvg}
              </span>
            </>
          );
          if (item.href) {
            return (
              <a
                key={`${props._key ?? props._type}-${index}`}
                href={item.href}
                className={rowClass + ' hover:bg-[var(--color-surface-raised)] transition-colors'}
              >
                {content}
              </a>
            );
          }
          return (
            <div key={`${props._key ?? props._type}-${index}`} className={rowClass}>
              {content}
            </div>
          );
        })}
      </Stack>
      {props.featuredMedia?.asset?.url ? (
        <div className="relative rounded-xl overflow-hidden">
          <Image
            source={props.featuredMedia}
            fit={ImageFit.COVER}
            rounded={ImageRadius.NONE}
            className="w-full h-auto block"
          />
          {(props.featuredTitle || props.featuredBody) ? (
            <div className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <Stack gap={StackGap.SM}>
                {props.featuredTitle ? (
                  <Heading as="h3" size={HeadingSize.H4} className="text-white">
                    {props.featuredTitle}
                  </Heading>
                ) : null}
                {props.featuredBody ? (
                  <Text size={TextSize.SM} className="text-white/85">
                    {props.featuredBody}
                  </Text>
                ) : null}
              </Stack>
            </div>
          ) : null}
        </div>
      ) : (props.featuredTitle || props.featuredBody) ? (
        <Stack gap={StackGap.SM}>
          {props.featuredTitle ? (
            <Heading as="h3" size={HeadingSize.H4}>
              {props.featuredTitle}
            </Heading>
          ) : null}
          {props.featuredBody ? (
            <Text size={TextSize.BASE} color={TextColor.MUTED}>
              {props.featuredBody}
            </Text>
          ) : null}
        </Stack>
      ) : null}
    </Grid>
  );
}

export function UseCaseListBlock(props: UseCaseListBlockProps) {
  return (
    <BaseBlock block={props}>
      <UseCaseListBlockContent {...props} />
    </BaseBlock>
  );
}
