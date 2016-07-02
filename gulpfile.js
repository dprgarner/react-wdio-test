var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

gulp.task('build', ['webpack', 'babelServer']);

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

gulp.task('babelServer', function () {
    return gulp.src('src/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/'));
});