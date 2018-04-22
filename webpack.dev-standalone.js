const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
        proxy: {
      "/appmetrics-dash": "http://localhost:3100",
      "/items": "http://localhost:3000",
      "/orders": "http://localhost:3000",
      "/users": "http://localhost:3000"


    }
  }
});