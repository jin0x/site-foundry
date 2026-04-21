export type ConnectorCategory = 'design-source' | 'cms' | 'deployment';

export type ConnectorCapabilities = Record<string, boolean>;

export type ConnectorTestResult = {
  ok: boolean;
  provider: string;
  details?: string;
};

export interface Connector {
  id: string;
  provider: string;
  category: ConnectorCategory;
  capabilities: ConnectorCapabilities;
  testConnection(): Promise<ConnectorTestResult>;
}

export type ApplyContext = {
  dryRun?: boolean;
  log?: (msg: string) => void;
};

export type ApplyStatus = 'applied' | 'dry-run';
export type ApplyMode = 'insert' | 'update';

export type ApplyResult<TPayload> = {
  status: ApplyStatus;
  mode: ApplyMode;
} & TPayload;

export interface Applicable<TInput, TResultPayload> {
  apply(input: TInput, context?: ApplyContext): Promise<ApplyResult<TResultPayload>>;
}
