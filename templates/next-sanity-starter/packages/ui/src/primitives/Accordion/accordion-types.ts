export const AccordionType = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
} as const;
export type AccordionType = (typeof AccordionType)[keyof typeof AccordionType];

export interface AccordionContextValue {
  type: AccordionType;
  openValues: Set<string>;
  toggle: (value: string) => void;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  focusTriggerByOffset: (value: string, offset: number | 'first' | 'last') => void;
  baseId: string;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}
