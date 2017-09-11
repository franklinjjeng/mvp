var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'src/public/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src/app'),
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
};