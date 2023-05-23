require('@rushstack/eslint-patch/modern-module-resolution');

const { parserOptions } = require('@nori-dot-com/eslint-config-nori/rules');

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@nori-dot-com/eslint-config-nori', 'next/core-web-vitals'],
  parserOptions: parserOptions({
    typescript: true,
    dir: __dirname,
    react: true,
    projectDirectories: ['tsconfig.json'],
  }),
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-relative-packages': 'off',
      },
    },
  ],
};

module.exports = config;
