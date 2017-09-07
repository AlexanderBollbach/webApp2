var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
  './src/index.js'
  ],
  output: { 
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
    { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: 'babel-loader' ,
      query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['transform-class-properties'], 
        }
    },
    { rules: 
      [ { 
        test: /\.css$/, 
        use: [ 
        'style-loader', 
        'css-loader' 
        ] 
      } ] 
    } 
    ]
  },
  devServer: { historyApiFallback: true, },
  plugins: [new HtmlWebpackPlugin({ title: 'Example', template: './index.html' }) ]
};