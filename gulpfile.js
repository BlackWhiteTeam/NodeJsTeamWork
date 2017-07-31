const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const browser = require('openurl');


gulp.task('unit-test', () => {
    return gulp.src([
        './app/controllers/*.js',
        './data/**/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});
gulp.task('integration-test', () => {
    return gulp.src([
        './app/routers/*.js',
        './db/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['unit-test'], () => {
    return gulp.src('./tests/unit/**/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
});

gulp.task('tests:integration', ['integration-test'], () => {
    return gulp.src('./tests/integration/**/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
});

const config = {
    connectionString: 'mongodb://localhost/test-db',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => require('./sockets').init(app))
        .then((http) => {
            http.listen(config.port, () => console.log('Port: ' + config.port));
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src(['./tests/browser/tests/**/*.js'])
        .pipe(mocha({
            timeout: 100000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});
