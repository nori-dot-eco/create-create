export interface Context<TCtx> {
  get: () => TCtx;
  set: (val: Partial<TCtx>) => void;
}

export interface Hooks<TCtx = any> {
  afterValidate?(opts: { context: Context<TCtx> }): Promise<void>;
  beforeInstall?(opts: {
    context: Context<TCtx>;
    targetPath: string;
  }): Promise<void>;
  afterInstall?(opts: {
    context: Context<TCtx>;
    targetPath: string;
  }): Promise<void>;
  afterSetup?(opts: {
    context: Context<TCtx>;
    targetPath: string;
  }): Promise<void>;
}

export type ProviderName = 'alchemy' | 'infura' | 'public';
export type ProviderApiKeyEnvVars = 'ALCHEMY_API_KEY' | 'INFURA_API_KEY';
export interface Provider {
  name: ProviderName;
  title: string;
  description: string;
  apiKey: {
    env: ProviderApiKeyEnvVars;
    url: string;
  } | null;
}

export interface Template<TCtx = any> {
  default?: boolean;
  description: string;
  framework: string;
  hooks?: Hooks<TCtx>;
  id: string;
  name: string;
  title: string;
}

export interface TemplateFramework {
  default?: boolean;
  description: string;
  id: string;
  name: string;
  title: string;
}
