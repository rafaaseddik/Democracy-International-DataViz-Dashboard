var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://' + require('os').hostname().toLowerCase() + ':3005',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.js',
    // the entry point of our app
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: path.resolve(__dirname, 'public'),

    publicPath: '/static/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader"
        ]
      },

    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3005,

    historyApiFallback: true,
    // respond to 404s with index.html
    disableHostCheck: true,
    hot: true,
    // enable HMR on the server
  },
};
