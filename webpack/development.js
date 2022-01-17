const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./common');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    compress: true,
    static: {
      directory: path.resolve(__dirname, '../build'),
    },
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 8080,
  },
});
