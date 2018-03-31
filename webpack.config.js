const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname),
  },
  devServer: {
    hot: true
  },
  module : {
    loaders : [
      {
          test    : /\.jsx?$/,
          exclude : /node_modules/,
          loader  : 'babel-loader'
      },
      {
          test    : /\.scss?/,
          loader  : 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};