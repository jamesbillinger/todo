let path = require('path');
let webpack = require('webpack');
let os = require('os');

var include = [
  path.resolve(__dirname, 'src')
];

module.exports = {
  target: 'web',
  mode: 'development',
  entry: [
    '@babel/polyfill',
    './src',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3001'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
    publicPath: 'http://localhost:3001/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      firebaseConfig: {
        apiKey: '"AIzaSyDPEstOMy9waxgsO3oIQqO0NvmHoMCmXnk"',
        authDomain: '"todo-385bd.firebaseapp.com"',
        databaseURL: '"https://todo-385bd.firebaseio.com"',
        projectId: '"todo-385bd"',
        storageBucket: '"todo-385bd.appspot.com"',
        messagingSenderId: '"893983988122"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      src: path.resolve(__dirname, 'src')
    },
    modules: ['node_modules', path.resolve(__dirname, 'src')]
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$|\.es6$|\.babel$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './webpack_cache/',
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              // Stage 0
              '@babel/plugin-proposal-function-bind',

              // Stage 1
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              ['@babel/plugin-proposal-optional-chaining', { loose: false }],
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
              '@babel/plugin-proposal-do-expressions',

              // Stage 2
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-function-sent',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-numeric-separator',
              '@babel/plugin-proposal-throw-expressions',

              // Stage 3
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              ['@babel/plugin-proposal-class-properties', { loose: false }],
              '@babel/plugin-proposal-json-strings',

              'react-hot-loader/babel'
            ]
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
