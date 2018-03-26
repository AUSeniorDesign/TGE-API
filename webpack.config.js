const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'js/bundle.[hash].js',
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
    new CleanWebpackPlugin(['./js/*.js', './js/*.map'], {'allowExternal': true}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};