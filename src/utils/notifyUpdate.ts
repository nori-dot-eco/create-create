import type { CLIOptions } from '..';
import packageJson from '../../package.json';

import { getPackageManager } from './getPackageManager';

import pico from 'picocolors';
import checkForUpdate from 'update-check';

const { log } = console;

export async function notifyUpdate({ options }: { options: CLIOptions }) {
  try {
    const res = await checkForUpdate(packageJson);
    if (res?.latest) {
      const packageManager = await getPackageManager({ options });
      const updateMessage =
        packageManager === 'pnpm'
          ? 'pnpm add -g @nori-dot-com/create'
          : packageManager === 'yarn'
          ? 'yarn global add @nori-dot-com/create'
          : 'npm i -g @nori-dot-com/create';

      log(
        pico.bold(
          `${pico.yellow(
            'A new version of `@nori-dot-com/create` is available!'
          )}\n` + `You can update by running: ${pico.cyan(updateMessage)}\n`
        )
      );
    }
    process.exit();
  } catch {
    // ignore error
  }
}
