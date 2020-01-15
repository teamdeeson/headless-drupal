/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');
const postcssCustomMedia = require('postcss-custom-media');
const postcssUtilities = require('postcss-utilities');
const postcssResponsiveType = require('postcss-responsive-type');
const postcssPresetEnv = require('postcss-preset-env');
const postcssInlineSvg = require('postcss-inline-svg');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport,
    postcssMixins,
    postcssNested,
    postcssCustomMedia,
    postcssUtilities({ textHideMethod: 'font' }),
    postcssResponsiveType,
    postcssPresetEnv({
      stage: 3,
      autoprefixer: false,
    }),
    postcssInlineSvg,
    autoprefixer({ grid: true }),
  ],
};
