let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let webpackConfig = require('./webpack.config');

console.log('starting bundler');
let webpackDevServer = new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  //quiet: true,
  //noInfo: false,
  stats: {colors: true},
  publicPath: 'http://localhost:3001/dist/',
  //contentBase: './dist',
  historyApiFallback: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  disableHostCheck: true
});

webpackDevServer.listen(3001, "0.0.0.0");
