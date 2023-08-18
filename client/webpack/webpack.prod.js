const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('react'),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '..', './src/favicon-zededa.ico'), to: path.resolve(__dirname, '..', "./build") }
      ]
    }),
  ],
}
