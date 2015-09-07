'use strict';

var WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config'),
    gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    dotenv = require('dotenv'),
    htmlreplace = require('gulp-html-replace');

dotenv.load();
var conf = Object.create(webpackConfig);
conf.devtool = 'source-map';

gulp.task('default', ['webpack-dev-server'], function() {});
gulp.task('dist', ['webpack:dist'], function() {});

/*
 * Run dev server
 */
gulp.task('webpack-dev-server', function(callback) {
  conf.devtool = 'eval';
  conf.debug = true;

  return new WebpackDevServer(webpack(conf), conf.devServer).listen(conf.serverConf.port, conf.serverConf.host, function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    return gutil.log('Server avaiable at: ' + conf.devUrl);
  });
});

/*
 * Build for production
 */
gulp.task('webpack:dist', function(callback) {

  var paths = {
    src:'./build',
    dest:'./dist'
  };

  gulp.src(paths.src + '/*.html')
    .pipe(htmlreplace({
      js: {
        src: 'dist.entry.js',
        tpl: '<script src="%s"></script>'
      }
    }))
    .pipe(gulp.dest(paths.dest));

  conf.output.path = path.join(__dirname, 'dist');

  conf.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        FIREBASE_URL: JSON.stringify(process.env.FIREBASE_PROD_URL),
        SPOTIFY_MARKET: JSON.stringify(process.env.SPOTIFY_MARKET),
        SPOTIFY_SEARCH_LIMIT: JSON.stringify(process.env.SPOTIFY_SEARCH_LIMIT),
        SPOTIFY_SEARCH_TYPES: JSON.stringify(process.env.SPOTIFY_SEARCH_TYPES)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ];

  return webpack(conf, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:dist', err);
    }
    gutil.log('[webpack:dist]', stats.toString({
      colors: true
    }));
    return callback();
  });
});
