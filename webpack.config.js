var webpack = require('webpack'),
    path = require('path'),
    dotenv = require('dotenv');

dotenv.load();

var serverConf = {
  protocol: 'http://',
  host: 'localhost',
  port: '8080'
};

var devUrl = serverConf.protocol + serverConf.host + ':' + serverConf.port,
    buildPath = path.join(__dirname, 'build'),
    srcPath = path.join(__dirname, 'src');

module.exports = {

  cache: true,
  devUrl: devUrl,
  serverConf: serverConf,

  entry: {
    dev: [
      'webpack-dev-server/client?' + devUrl,
      'webpack/hot/only-dev-server',
      'bootstrap-sass!./bootstrap-sass.config.js',
      './src/app.js'
    ],
    dist: [
      'bootstrap-sass!./bootstrap-sass.config.js',
      './src/app.js'
    ]
  },

  output: {
    path: buildPath,
    publicPath: devUrl + '/', // Omit the slash and everything breaks
    filename: '[name].entry.js',
    sourceMapFilename: '[file].map'
  },

  devServer: {
    contentBase: buildPath,
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: {
      colors: true
    }
  },

  // SCSS is handled via bootstrap-sass-loader
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel-loader'
        ],
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },

  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: [
    // Development settings.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        FIREBASE_URL: JSON.stringify(process.env.FIREBASE_DEV_URL),
        SPOTIFY_MARKET: JSON.stringify(process.env.SPOTIFY_MARKET),
        SPOTIFY_SEARCH_LIMIT: JSON.stringify(process.env.SPOTIFY_SEARCH_LIMIT),
        SPOTIFY_SEARCH_TYPES: JSON.stringify(process.env.SPOTIFY_SEARCH_TYPES)
      }
    })
  ]

};
