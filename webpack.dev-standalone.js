const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080
  }
});