const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    ts = require('gulp-typescript'),
    nodemon = require('gulp-nodemon'),
    tsify = require('tsify'),
    babelfy = require('babelify'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),

    tsProject = ts.createProject('tsconfig.json'),

/**
 * Add paths for static files to the statics array to have them copied to dist.
 */
    paths = {
        'ts': ['src/**/*.ts', '!src/public/**/*.ts'],
        'browserTS': 'src/public/js/*.ts',
        'statics': [
            'src/**/*.ejs',
            'src/public/images/'
        ]
    };

gulp.task('copy-statics', () => gulp.src(paths.statics, { 'base': 'src/' }).pipe(gulp.dest('dist/')));

gulp.task('transpile', () => {
    const tsResult = gulp.src(paths.ts, { 'base': 'src/' })
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

gulp.task('bundle', () => {
    const browserifyOptions = {
        'basedir': 'src/public/js',
        'debug': true,
        'entries': ['main.ts'],
        'cache': {},
        'packageCache': {}
    };

    return browserify(browserifyOptions)
        .plugin(tsify, { 'target': 'es2015' })
        .transform('babelify', {
            'presets': ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ 'loadMaps': true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/public/js/'));
});

gulp.task('watch', () => {
    watch(paths.ts, () => {
        gulp.start('transpile');
    });
    watch(paths.statics, () => {
        gulp.start('copy-statics');
    });
    watch(paths.browserTS, () => {
        gulp.start('bundle');
    });
});

gulp.task('start', () => {
    nodemon({
        'script': 'dist/server.js',
        'ext': 'js',
        'env': {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('default', ['transpile', 'bundle', 'copy-statics', 'watch', 'start']);