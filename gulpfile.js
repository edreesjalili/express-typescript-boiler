const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
// const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const tsify = require('tsify');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

const tsProject = ts.createProject('tsconfig.json');

const paths = {
	ts: ['src/**/*.ts', '!src/public/**/*.ts'],
	browserTS: 'src/public/js/*.ts',
	sass: 'src/public/sass/**/*.scss',
	statics: [
		'src/**/*.ejs',
		'src/public/images/',
	],
};

gulp.task('copy-statics', () => gulp.src(paths.statics, {
	base: 'src/',
}).pipe(gulp.dest('dist/')));

gulp.task('transpile', () => {
	const tsResult = gulp.src(paths.ts, { base: 'src/' })
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/'));
});

gulp.task('bundle', () => {
	const browserifyOptions = {
		basedir: 'src/public/js',
		debug: true,
		entries: ['main.ts'],
		cache: {},
		packageCache: {},
	};

	return browserify(browserifyOptions)
		.plugin(tsify, {
			target: 'es2015',
		})
		.transform('babelify', {
			presets: ['es2015'],
			extensions: ['.ts'],
		})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true,
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/public/js/'));
});

gulp.task('sass', () => gulp.src(paths.sass, { base: 'src/'	})
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError()))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/')));

gulp.task('watch', () => {
	watch(paths.ts, () => gulp.start('transpile'));
	watch(paths.statics, () => gulp.start('copy-statics'));
	watch(paths.browserTS, () => gulp.start('bundle'));
	watch(paths.sass, () => gulp.start('sass'));
});

gulp.task('start', () => {
	nodemon({
		script: 'dist/server.js',
		ext: 'js',
		env: {
			NODE_ENV: 'development',
		},
	});
});

gulp.task('default', ['transpile', 'bundle', 'sass', 'copy-statics', 'watch', 'start']);