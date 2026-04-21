'use client';

import { useEffect, useState } from 'react';

function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export interface DevTocSection {
  id: string;
  label: string;
}

export interface DevTocProps {
  sections: DevTocSection[];
}

export function DevToc({ sections }: DevTocProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
      <nav aria-label="Page sections">
        <p className="mb-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-tertiary)]">
          On this page
        </p>
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleClick(event, section.id)}
                  className={cx(
                    'block rounded-md px-3 py-1.5 text-sm transition-colors',
                    'border border-transparent',
                    isActive
                      ? 'border-white/10 bg-white/[0.06] text-[var(--color-primary)]'
                      : 'text-[var(--color-tertiary)] hover:bg-white/[0.03] hover:text-[var(--color-secondary)]',
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
