require('@rushstack/eslint-patch/modern-module-resolution');

const { parserOptions } = require('@nori-dot-com/eslint-config-nori/rules');

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@nori-dot-com/eslint-config-nori'],
  parserOptions: parserOptions({
    projectDirectories: [
      'tsconfig.json',
      'templates/next/default/tsconfig.json',
    ],
    typescript: true,
    dir: __dirname,
    react: true,
  }),
};

module.exports = config;
