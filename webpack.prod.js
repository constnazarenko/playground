const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    filename: 'index.js',
    library: 'playground',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    clean: true,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/static',
          to: 'assets/static',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
});
