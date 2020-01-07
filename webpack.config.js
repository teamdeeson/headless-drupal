const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';

  const serverConfig = {
    target: 'node',
    entry: { 'local-server': './src/frontend/server' },
    output: { publicPath: '/dist/' },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /(node_modules)/ },
        { test: /favicon.ico$/, loader: 'file-loader' },
        {
          test: /\.(css|eot|woff2?|[ot]tf)$/,
          use: ['null-loader'],
        },
      ],
    },
    externals: [nodeExternals()],
    plugins: [
      new NodemonPlugin({
        watch: './dist/local-server.js',
        script: './dist/local-server.js',
        nodeArgs: ['--inspect', '--require', 'dotenv/config'],
      }),
    ],
  };

  const browserConfig = {
    entry: './src/frontend',
    output: {
      filename: prod ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/dist/',
    },
    resolve: {
      alias: {
        modernizr$: path.resolve(__dirname, '.modernizrrc.js'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          loader: 'webpack-modernizr-loader',
          test: /.modernizrrc\.js$/,
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 1000 },
            },
          ],
        },
        { test: /\.eot$/, loader: 'file-loader' },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader',
          options: { prefix: 'font/', limit: 5000 },
        },
        {
          test: /\.[ot]tf$/,
          loader: 'url-loader',
          options: { limit: 10000, mimetype: 'application/octet-stream' },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: prod ? '[name].[contenthash].css' : '[name].css',
      }),
      new ManifestPlugin(),
    ],
  };
  return [serverConfig, browserConfig];
};
