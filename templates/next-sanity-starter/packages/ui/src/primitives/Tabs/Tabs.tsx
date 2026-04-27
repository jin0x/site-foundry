'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../lib/cx';
import type { TabsContextValue, TabsVariant } from './tabs-types';

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /* P6: 'pill' (default — black-pill active state) or 'underline'
   * (Decisions tabbed-use-cases pattern: 18px text, 4px brand-turquoise
   * underline on active, full-width divider line below the row). */
  variant?: TabsVariant;
  children?: ReactNode;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'pill',
  className,
  children,
  ...rest
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const value = controlledValue ?? uncontrolled;
  const baseId = useId();
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const registerTrigger = useCallback((val: string, el: HTMLButtonElement | null) => {
    if (el) {
      triggerRefs.current.set(val, el);
    } else {
      triggerRefs.current.delete(val);
    }
  }, []);

  const focusTriggerByOffset = useCallback(
    (current: string, offset: number | 'first' | 'last') => {
      const entries = Array.from(triggerRefs.current.entries());
      if (entries.length === 0) return;

      let targetIndex: number;
      if (offset === 'first') {
        targetIndex = 0;
      } else if (offset === 'last') {
        targetIndex = entries.length - 1;
      } else {
        const currentIndex = entries.findIndex(([v]) => v === current);
        if (currentIndex === -1) return;
        targetIndex = (currentIndex + offset + entries.length) % entries.length;
      }

      const target = entries[targetIndex];
      if (!target) return;
      target[1].focus();
      setValue(target[0]);
    },
    [setValue],
  );

  const contextValue = useMemo<TabsContextValue>(
    () => ({ value, setValue, baseId, variant, registerTrigger, focusTriggerByOffset }),
    [value, setValue, baseId, variant, registerTrigger, focusTriggerByOffset],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cx('flex flex-col gap-8 items-center', className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, ...rest }: TabsListProps) {
  const ctx = useTabsContext('TabsList');
  return (
    <div
      role="tablist"
      className={cx(
        ctx.variant === 'underline'
          ? /* underline metaphor: full-width row with bottom divider line;
             * tabs sit flush at the bottom and overlap the divider with
             * their own border-b-4 when active (per Hp 9 design). */
            'flex w-full gap-8 border-b border-[var(--color-border-default)]'
          : 'inline-flex gap-1 rounded-full border border-[var(--color-code-border)] bg-[var(--color-surface-raised)] p-1',
        className,
      )}
      {...rest}
    />
  );
}

export interface TabsTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

export function TabsTrigger({
  value,
  className,
  onClick,
  onKeyDown,
  children,
  ...rest
}: TabsTriggerProps) {
  const ctx = useTabsContext('TabsTrigger');
  const selected = ctx.value === value;
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const contentId = `${ctx.baseId}-content-${value}`;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          ctx.focusTriggerByOffset(value, 1);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          ctx.focusTriggerByOffset(value, -1);
          break;
        case 'Home':
          event.preventDefault();
          ctx.focusTriggerByOffset(value, 'first');
          break;
        case 'End':
          event.preventDefault();
          ctx.focusTriggerByOffset(value, 'last');
          break;
      }
    },
    [ctx, onKeyDown, value],
  );

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={selected}
      aria-controls={contentId}
      tabIndex={selected ? 0 : -1}
      ref={(el) => ctx.registerTrigger(value, el)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx.setValue(value);
      }}
      onKeyDown={handleKeyDown}
      className={cx(
        'transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-turquoise)] focus-visible:outline-offset-2',
        ctx.variant === 'underline'
          ? cx(
              /* 18px text + bottom-aligned 4px underline. -mb-px pulls the
               * 4px border down to overlap TabsList's 1px divider so the
               * indicator visually replaces the divider segment under the
               * active tab. */
              'pb-3 -mb-px border-b-4 border-transparent text-h5 font-normal',
              selected
                ? 'text-[var(--color-brand-turquoise)] border-[var(--color-brand-turquoise)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]',
            )
          : cx(
              'px-4 py-2 rounded-full text-sm font-medium',
              selected
                ? 'bg-[var(--color-primary)] text-[var(--color-inverse)]'
                : 'text-[var(--color-tertiary)] hover:text-[var(--color-primary)]',
            ),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

export function TabsContent({ value, className, children, ...rest }: TabsContentProps) {
  const ctx = useTabsContext('TabsContent');
  if (ctx.value !== value) return null;
  const contentId = `${ctx.baseId}-content-${value}`;
  const triggerId = `${ctx.baseId}-trigger-${value}`;

  return (
    <div
      role="tabpanel"
      id={contentId}
      aria-labelledby={triggerId}
      tabIndex={0}
      className={cx('w-full focus-visible:outline-2 focus-visible:outline-[var(--color-brand-turquoise)] focus-visible:outline-offset-2 rounded-md', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
