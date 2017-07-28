const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test', () => {
    return gulp.src([
        './app/**/*.js',
        './data/**/*.js',
        './models/**/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src('./tests/unit/**/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
});
