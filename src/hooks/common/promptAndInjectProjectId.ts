import path from 'path';

import type { Hooks } from '../../types';

import fs from 'fs-extra';
import pico from 'picocolors';
import prompts from 'prompts';

const { log } = console;

export interface PromptAndInjectProjectIdContext {
  walletConnectProjectId: string;
}

export const promptAndInjectProjectId =
  (): Hooks<PromptAndInjectProjectIdContext> => ({
    async afterValidate({ context }) {
      const { walletConnectProjectId } = await prompts({
        name: 'walletConnectProjectId',
        message: `Optional: What is your WalletConnect Cloud Project ID?\n${pico.blue(
          'Find it at: https://cloud.walletconnect.com/sign-in'
        )}\n${pico.cyan('⏎ to skip')}\n`,
        type: 'text',
      });
      context.set({ walletConnectProjectId });
    },
    async beforeInstall({ context, targetPath }) {
      const { walletConnectProjectId } = context.get();
      if (!fs.existsSync(path.join(targetPath, '.env')))
        fs.writeFileSync(path.join(targetPath, '.env'), '');

      fs.appendFileSync(
        path.join(targetPath, '.env'),
        `WALLET_CONNECT_PROJECT_ID=${walletConnectProjectId}\n`
      );
      if (typeof walletConnectProjectId === 'string') {
        log(pico.green('✔'), 'Added WalletConnect Project ID.');
      }
      log();
    },
  });
