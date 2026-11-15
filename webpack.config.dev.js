const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
    clean: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/resource/image/favicon.png',
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

  devServer: {
    static: false,
    host: '0.0.0.0',
    port: 8000
  }
};
