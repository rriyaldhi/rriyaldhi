const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: "production",

  devtool: "cheap-module-source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  entry: './src/index.tsx',
  output: {
    filename: '[name]-[chunkhash].js',
    clean: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/resource/image/favicon.png',
    }),
    new JavaScriptObfuscator(),
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
