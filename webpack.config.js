const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
           {
           loader: 'css-loader',
           options: { minimize:false, importLoaders: 1 }
           },
           {
           loader: 'postcss-loader', options: {
             plugins: [
               require('postcss-import')({}),
               require('stylelint')({}),
               require('autoprefixer')()
             ]},	
           }
          ]
        })
      }
    ]
  },
  plugins: [
    new StyleLintPlugin({
      context: './src/css',
      files: '*.css',
      failOnError: false,
      quiet: false,
    }),
    new ExtractTextPlugin('styles.css'),
  ]
};