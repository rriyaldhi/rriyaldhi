const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", "js"]
  },

  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateParameters:
        {
          urls: [
            'react.development.js',
            'react-dom.development.js'
          ]
        },
      template: './src/index.ejs',
    }),
    new CopyPlugin({
      patterns: [
        { from: './node_modules/react/umd/react.development.js', to: '.' },
        { from: './node_modules/react-dom/umd/react-dom.development.js', to: '.' },
        {
          from: './src/resource/image/*.jpg',
          to: './resource/image/[name][ext]',
        },
        {
          from: './src/resource/image/favicon.png',
          to: './[name][ext]',
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

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  devServer: {
    host: '0.0.0.0',
    port: 8000
  }
};
