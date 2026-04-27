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
import type {
  AccordionContextValue,
  AccordionItemContextValue,
  AccordionType,
} from './accordion-types';

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(component: string) {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}

function useAccordionItemContext(component: string) {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ctx;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  defaultValue?: string | string[];
  children?: ReactNode;
}

export function Accordion({
  type = 'single',
  defaultValue,
  className,
  children,
  ...rest
}: AccordionProps) {
  const baseId = useId();
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [openValues, setOpenValues] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    if (Array.isArray(defaultValue)) return new Set(defaultValue);
    return new Set([defaultValue]);
  });

  const toggle = useCallback(
    (value: string) => {
      setOpenValues((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
          return next;
        }
        if (type === 'single') {
          return new Set([value]);
        }
        next.add(value);
        return next;
      });
    },
    [type],
  );

  const registerTrigger = useCallback((value: string, el: HTMLButtonElement | null) => {
    if (el) {
      triggerRefs.current.set(value, el);
    } else {
      triggerRefs.current.delete(value);
    }
  }, []);

  const focusTriggerByOffset = useCallback(
    (value: string, offset: number | 'first' | 'last') => {
      const entries = Array.from(triggerRefs.current.entries());
      if (entries.length === 0) return;

      let targetIndex: number;
      if (offset === 'first') {
        targetIndex = 0;
      } else if (offset === 'last') {
        targetIndex = entries.length - 1;
      } else {
        const currentIndex = entries.findIndex(([v]) => v === value);
        if (currentIndex === -1) return;
        targetIndex = (currentIndex + offset + entries.length) % entries.length;
      }

      entries[targetIndex]?.[1].focus();
    },
    [],
  );

  const contextValue = useMemo<AccordionContextValue>(
    () => ({ type, openValues, toggle, registerTrigger, focusTriggerByOffset, baseId }),
    [type, openValues, toggle, registerTrigger, focusTriggerByOffset, baseId],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cx('flex flex-col gap-2', className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

export function AccordionItem({ value, className, children, ...rest }: AccordionItemProps) {
  const { openValues, baseId } = useAccordionContext('AccordionItem');
  const isOpen = openValues.has(value);

  const itemValue = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      isOpen,
      triggerId: `${baseId}-${value}-trigger`,
      contentId: `${baseId}-${value}-content`,
    }),
    [value, isOpen, baseId],
  );

  return (
    <AccordionItemContext.Provider value={itemValue}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cx(
          'group overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-surface-page)]',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function AccordionTrigger({
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: AccordionTriggerProps) {
  const { toggle, registerTrigger, focusTriggerByOffset } = useAccordionContext('AccordionTrigger');
  const { value, isOpen, triggerId, contentId } = useAccordionItemContext('AccordionTrigger');

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const keyMap: Record<string, number | 'first' | 'last'> = {
      ArrowDown: 1,
      ArrowUp: -1,
      Home: 'first',
      End: 'last',
    };
    const offset = keyMap[event.key];
    if (offset !== undefined) {
      event.preventDefault();
      focusTriggerByOffset(value, offset);
    }
  };

  return (
    <button
      ref={(el) => registerTrigger(value, el)}
      type="button"
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      data-state={isOpen ? 'open' : 'closed'}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        toggle(value);
      }}
      onKeyDown={handleKeyDown}
      className={cx(
        'flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-medium',
        'transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-turquoise)] focus-visible:outline-offset-2',
        className,
      )}
      {...rest}
    >
      {children}
      {/* Plus / minus toggle: vertical line hides when open. Mirrors the
       * Phosphor ph:plus / ph:minus pair Decisions uses on accordion headers. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <line
          x1="12"
          y1="5"
          x2="12"
          y2="19"
          className={cx('transition-opacity duration-200', isOpen && 'opacity-0')}
        />
      </svg>
    </button>
  );
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function AccordionContent({ className, children, ...rest }: AccordionContentProps) {
  const { isOpen, contentId, triggerId } = useAccordionItemContext('AccordionContent');

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={isOpen ? 'open' : 'closed'}
      className={cx(
        'grid transition-[grid-template-rows] duration-200 ease-out',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="overflow-hidden">
        <div className={cx('px-5 pt-0 pb-5 text-[var(--color-secondary)]', className)} {...rest}>
          {children}
        </div>
      </div>
    </div>
  );
}
