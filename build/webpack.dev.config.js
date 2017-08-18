const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    // hot: true,
    // inline: true,
    contentBase: '/dist/',
    // publicPath: '/www',
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    disableHostCheck: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    })
  ],

  devtool: 'inline-source-map'
})