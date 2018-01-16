const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/Game.ts",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Prototype',
      template: __dirname + '/src/index.html'
    }),
    new CleanWebpackPlugin(__dirname + '/dist'),
    new CopyWebpackPlugin([
      {
        from:  __dirname + '/src/sprites',
        to:  __dirname + '/dist/sprites'
      }
    ])
  ]
};
