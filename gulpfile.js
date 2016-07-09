var babel = require('gulp-babel');
var gulp = require('gulp');
var gutil = require('gulp-util');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var webpack = require('webpack');

var PORT = 80;
var server = null;

gulp.task('build', ['webpack', 'babel']);

gulp.task('webpack', function (done) {
    webpack(require('./webpack.conf.js'), function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log(stats.toString({
            chunks: false,
            colors: true,
            hash: false,
        }));
        done();
    });
});

gulp.task('babel', function () {
    return gulp.src('src/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['babel'], function (done) {
    server = require('./dist/server').listen(PORT, done);
});

gulp.task('selenium', function (done) {
    selenium.start(function (err, child) {
        selenium.child = child;
        done(err);
    });
});

// Boot up a selenium and live server, run the e2e tests, and exit servers
gulp.task('test', ['selenium', 'serve', 'webpack'], function () {
    return gulp.src('wdio.conf.js')
        .pipe(webdriver())
        .on('end', function () {
            selenium.child.kill();
            server.close();
        });
});