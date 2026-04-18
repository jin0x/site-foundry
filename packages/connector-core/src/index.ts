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
