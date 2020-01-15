module.exports = {
  stories: ['../src/frontend/**/*.stories.[tj]sx'],
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.(ts|js)x?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
