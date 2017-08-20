const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
// const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const copyPaths = {
    'pages': ['src/views/**/*.ejs']
};
const watchPaths = [
    'src/**/*.ts'
];

gulp.task('copy-paths', () => gulp.src(paths.pages).pipe(gulp.dest('dist')));

gulp.task('build', () => {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject);

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => watch(watchPaths).pipe(gulp.dest('dist')));

gulp.task('default', ['copy-paths']);