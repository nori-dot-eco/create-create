import path from 'path';

import { dependencies } from './package.json';

import fs from 'fs-extra';
import pico from 'picocolors';
import { defineConfig } from 'tsup';

const { log } = console;

getTemplates();

export default defineConfig({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  external: Object.keys(dependencies),
  format: ['esm'],
  ignoreWatch: ['**/generated/**'],
  async onSuccess() {
    getTemplates();
    return Promise.resolve();
  },
  platform: 'node',
});

/**
 * Temporary workaround until esbuild supports glob imports.
 *
 * @see https://github.com/evanw/esbuild/pull/2508
 *
 * @returns The list of templates.
 */
function getTemplates(): string[] {
  const frameworks = fs.readdirSync(path.join(__dirname, 'templates'));

  let frameworksSrc = 'export const templateFrameworks = {';
  let templatesSrc = 'export const templates = {';

  for (const framework of frameworks) {
    const frameworkPath = path.join(__dirname, 'templates', framework);
    if (!fs.lstatSync(frameworkPath).isDirectory()) continue;
    if (fs.existsSync(path.join(frameworkPath, '_meta.ts'))) {
      frameworksSrc += `\n  '${framework}': () => import('../../templates/${framework}/_meta'),`;
      templatesSrc += `\n  '${framework}': {`;
    } else {
      log(
        pico.yellow(
          [
            `Unable to find \`_meta.ts\` for framework "${framework}".`,
            '',
            'Please make sure that you have a file named `_meta.ts` in the root of your framework folder.',
            '',
            'Example:',
            '',
            `${path.join(frameworkPath, '_meta.ts')}`,
            '```',
            "import { createTemplateFramework } from '../createTemplateFramework'",
            '',
            'export default createTemplateFramework({',
            '  name: "example-framework",',
            '  title: "Example Framework",',
            '  description: "An example framework",',
            '})',
            '```',
          ].join('\n')
        )
      );
    }

    const templates = fs.readdirSync(frameworkPath);
    for (const template of templates) {
      const templatePath = path.join(frameworkPath, template);
      if (!fs.lstatSync(templatePath).isDirectory()) continue;
      if (fs.existsSync(path.join(templatePath, '_meta.ts'))) {
        templatesSrc += `\n    '${template}': () => import('../../templates/${framework}/${template}/_meta'),`;
      } else {
        log(
          pico.yellow(
            [
              `Unable to find \`_meta.ts\` for template "${template}".`,
              '',
              'Please make sure that you have a file named `_meta.ts` in the root of your template folder.',
              '',
              'Example:',
              '',
              `${path.join(templatePath, '_meta.ts')}`,
              '```',
              "import { createTemplate } from '../createTemplate'",
              '',
              'export default createTemplate({',
              '  name: "example-template",',
              '  title: "Example Template",',
              '  description: "An example template using Nori",',
              '})',
              '```',
            ].join('\n')
          )
        );
      }
    }

    templatesSrc += '\n  },';
  }
  templatesSrc += '\n}\n';
  frameworksSrc += '\n}\n';

  const generatedPath = path.join(__dirname, 'src/generated');
  if (!fs.existsSync(generatedPath)) fs.mkdirSync(generatedPath);
  fs.writeFileSync(
    path.join(generatedPath, 'imports.ts'),
    `${templatesSrc}\n${frameworksSrc}`
  );

  return frameworks;
}
