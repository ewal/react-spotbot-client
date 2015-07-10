'use strict';

var WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config'),
    gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    dotenv = require('dotenv');

dotenv.load();
var conf = Object.create(webpackConfig);
conf.devtool = 'source-map';

gulp.task('default', ['webpack-dev-server'], function() {});
gulp.task('build', ['webpack:build'], function() {});

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
gulp.task('webpack:build', function(callback) {

  conf.output.path = path.join(__dirname, 'dist');

  conf.plugins = conf.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        FIREBASE_URL: JSON.stringify(process.env.FIREBASE_PROD_URL)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  return webpack(conf, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    return callback();
  });
});
