const { resolve } = require('path')

module.exports = {
  entry: {
    kraken: resolve(__dirname, 'src', 'kraken.bootstrap.tsx'),
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: ['ts-loader'],
      },
    ],
  },
}
