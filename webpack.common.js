const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    index: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|gif|png|wav|mp3)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.ico',
      template: './src/index.html',
      filename: './index.html',
      inject: 'body',
    }),
    // new CopyWebpackPlugin({
    //  patterns: [{ from: "translations", to: "translations" }],
    //}),
  ],
};
