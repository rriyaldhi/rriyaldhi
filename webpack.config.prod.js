const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",

  devtool: "cheap-module-source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  entry: './src/index.tsx',
  output: {
    filename: '[name]-[chunkhash].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs'
    }),
    new JavaScriptObfuscator(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/resource/image/*.jpg',
          to: './resource/image/[name][ext]', // Use [name][ext] to keep the original filenames
        },
        {
          from: './src/resource/image/favicon.png',
          to: './[name][ext]', // Copy favicon.png directly to the root
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },

};
