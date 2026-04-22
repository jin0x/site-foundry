export interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  focusTriggerByOffset: (value: string, offset: number | 'first' | 'last') => void;
}
