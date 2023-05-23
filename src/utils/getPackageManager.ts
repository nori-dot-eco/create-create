import type { CLIOptions } from '..';

import { detect } from 'detect-package-manager';

export const getPackageManager = ({ options }: { options?: CLIOptions }) => {
  if (options != undefined) {
    const { npm, pnpm, yarn } = options;
    if (npm) return 'npm';
    if (pnpm) return 'pnpm';
    if (yarn) return 'yarn';
  }
  const { npm_config_user_agent: userAgent } = process.env;
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm';
    if (userAgent.includes('npm')) return 'npm';
    if (userAgent.includes('yarn')) return 'yarn';
  }
  return detect();
};
