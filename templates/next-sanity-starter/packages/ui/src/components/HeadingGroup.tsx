import { PortableText } from '@portabletext/react';
import type { PortableTextLike, SectionHeadingValue } from '@site-foundry-template/sanity-types';

export interface HeadingGroupProps {
  value?: SectionHeadingValue | null;
}

export function HeadingGroup({ value }: HeadingGroupProps) {
  if (!value?.enabled) {
    return null;
  }

  return (
    <div className={['sf-heading-group', `sf-heading-group--${value.align || 'left'}`].join(' ')}>
      {value.eyebrow ? <p className="sf-eyebrow">{value.eyebrow}</p> : null}
      {value.heading ? <h2 className="sf-heading">{value.heading}</h2> : null}
      {value.subheading?.length ? (
        <div className="sf-subheading">
          <PortableText value={value.subheading as PortableTextLike} />
        </div>
      ) : null}
    </div>
  );
}
