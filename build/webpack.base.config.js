const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, '../node_modules')
      // '../node_modules'
    ],
    extensions: ['.js', '.jsx', '.styl', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        // exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
        // exclude: /node_modules/
      },
    ]
  }
}