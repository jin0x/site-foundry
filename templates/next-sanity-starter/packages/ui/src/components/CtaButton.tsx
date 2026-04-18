import type { CtaValue, LinkValue } from '@site-foundry-template/sanity-types';

export interface CtaButtonProps {
  value: CtaValue;
}

function resolveHref(link?: LinkValue | null): string {
  if (!link) {
    return '#';
  }

  if (link.kind === 'page') {
    const slug = link.page?.slug;
    return slug === 'home' ? '/' : `/${slug ?? ''}`;
  }

  if (link.kind === 'email') {
    return link.email ? `mailto:${link.email}` : '#';
  }

  if (link.kind === 'file') {
    return link.file?.url || '#';
  }

  return link.href || '#';
}

export function CtaButton({ value }: CtaButtonProps) {
  if (!value.enabled || !value.text) {
    return null;
  }

  const href = resolveHref(value.link);

  return (
    <a
      className={['sf-button', `sf-button--${value.color || 'primary'}`, `sf-button--${value.variant || 'solid'}`].join(' ')}
      href={href}
      target={value.link?.openInNewTab ? '_blank' : undefined}
      rel={value.link?.openInNewTab ? 'noreferrer' : undefined}
    >
      {value.text}
    </a>
  );
}
