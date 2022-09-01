const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin')
const urlgulpAdjuster = require('gulp-css-url-adjuster')
const browserSync = require('browser-sync').create();

// Sass Task
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(urlgulpAdjuster({
			prepend: './images/',
		}))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
	return src('app/js/script.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// Fonts Task

function fontsTask() {
	return src('app/fonts/**/*')
			.pipe(dest('dist/fonts'))
}

// Image Task

function imagesTask() {
	return src('app/images/**/*')
		.pipe(imagemin())
		.pipe(dest('dist/images'))
}

// BrowserSync
function browserSyncServe(cb) {
	browserSync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browserSync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/scss/**/*.scss', 'app/**/*.js', 'app/images/*.{gif,jpg,png,svg}'],
		series(scssTask, jsTask, imagesTask, browserSyncReload)
	);
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, fontsTask, imagesTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask, jsTask, fontsTask, imagesTask);
