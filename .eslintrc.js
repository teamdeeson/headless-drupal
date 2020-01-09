// Based on https://www.npmjs.com/package/eslint-config-airbnb-typescript
module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'eslint-comments', 'jest'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recomme nded',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
};
