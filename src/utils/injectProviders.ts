import path from 'path';

import { providers } from '../meta';
import type { ProviderApiKeyEnvVars, ProviderName } from '../types';

import fs from 'fs-extra';

export function injectProviders({
  envNamespace,
  envPrefix,
  envVars,
  targetPath,
  providerNames,
}: {
  envNamespace: string;
  envPrefix: string;
  envVars: Record<ProviderApiKeyEnvVars, string>;
  targetPath: string;
  providerNames: ProviderName[];
}) {
  if (Object.values(envVars).length > 0) {
    if (!fs.existsSync(path.join(targetPath, '.env')))
      fs.writeFileSync(path.join(targetPath, '.env'), '');
    if (!fs.existsSync(path.join(targetPath, '.env.example')))
      fs.writeFileSync(path.join(targetPath, '.env.example'), '');

    for (const [key, value] of Object.entries(envVars)) {
      fs.appendFileSync(
        path.join(targetPath, '.env'),
        `${envPrefix}${key}=${value}\n`
      );
      fs.appendFileSync(
        path.join(targetPath, '.env.example'),
        `${envPrefix}${key}=\n`
      );
    }
  }

  const configPath = path.join(targetPath, 'src', 'wagmi.ts');
  let src = fs.readFileSync(configPath).toString();

  // Add provider imports
  src = src.replace(
    /import { publicProvider } from 'wagmi\/providers\/public'/,
    providerNames
      .map(
        (providerName) =>
          `import { ${providerName}Provider } from 'wagmi/providers/${providerName}'`
      )
      .join('\n')
  );

  // Add providers to configureChains
  src = src.replace(
    /publicProvider\(\)/,
    `${providerNames
      .map((providerName) => {
        const provider = providers[providerName];
        return `\n    ${provider.name}Provider(${
          provider.apiKey == undefined
            ? ''
            : `{ apiKey: ${envNamespace}.${envPrefix}${provider.apiKey.env}! }`
        }),`;
      })
      .join('')}\n  `
  );

  fs.writeFileSync(configPath, src);
}
