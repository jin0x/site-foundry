import type { AccordionBlock as AccordionBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '../../primitives/Accordion';

/**
 * Inner render — omits the BaseBlock section shell so this can be composed
 * inside other blocks (e.g. a tabbedFeatures tab pane) without double-wrapping
 * padding / sectionHeading.
 */
export function AccordionBlockContent(props: AccordionBlockProps) {
  const items = props.items ?? [];
  if (!items.length) return null;

  const defaultValue = items.findIndex((item) => item.defaultOpen);
  const defaultOpenKey = defaultValue >= 0 ? `item-${defaultValue}` : undefined;

  return (
    <Accordion type={AccordionType.SINGLE} defaultValue={defaultOpenKey}>
      {items.map((item, index) => (
        <AccordionItem key={`${props._key ?? props._type}-${index}`} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          {item.body ? <AccordionContent>{item.body}</AccordionContent> : null}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function AccordionBlock(props: AccordionBlockProps) {
  return (
    <BaseBlock block={props}>
      <AccordionBlockContent {...props} />
    </BaseBlock>
  );
}
