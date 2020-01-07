// Based on https://www.npmjs.com/package/eslint-config-airbnb-typescript
module.exports = {
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    // 'jest',
    // 'promise',
    // 'unicorn',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    // 'plugin:jest/recommended',
    // 'plugin:promise/recommended',
    // 'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
    // jest: true,
  },
};

// https://medium.com/@myylow/how-to-keep-the-airbnb-eslint-config-when-moving-to-typescript-1abb26adb5c6

//eslint-plugin-react-hooks?
