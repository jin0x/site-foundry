import type { FeatureGridBlock as FeatureGridBlockProps } from '@site-foundry-template/sanity-types';
import { HeadingGroup } from '../../components/HeadingGroup';
import { Section } from '../../components/Section';

export function FeatureGridBlock(props: FeatureGridBlockProps) {
  return (
    <Section backgroundTone={props.backgroundTone} spacing={props.spacing}>
      <div className="sf-stack sf-stack--lg">
        <HeadingGroup value={props.sectionHeading} />
        <div className={['sf-grid', `sf-grid--${props.columns || 3}`].join(' ')}>
          {props.items?.map((item, index) => (
            <article key={`${props._key || props._type}-${index}`} className="sf-card">
              {item.eyebrow ? <p className="sf-card__eyebrow">{item.eyebrow}</p> : null}
              <h3 className="sf-card__title">{item.title}</h3>
              {item.description ? <p className="sf-card__copy">{item.description}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
