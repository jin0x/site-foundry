export type TabsVariant = 'pill' | 'underline';

export interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  variant: TabsVariant;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  focusTriggerByOffset: (value: string, offset: number | 'first' | 'last') => void;
}
