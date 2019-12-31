const gulp = require('gulp');
// const styl = require('gulp-styl');
const stylus = require('gulp-stylus');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const webp = require('gulp-webp');
const del = require('del');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const cached = require('gulp-cached');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const cheerio = require('gulp-cheerio');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const deploy = require('gulp-gh-pages');

const isDevelopment = process.env.NODE_ENV === 'development';
const assetsGlob = [
  'src/fonts/*.*',
  // 'src/js/*.*',
];

gulp.task('deploy', () => {
  return gulp.src('build/**/*.*')
    .pipe(deploy());
});

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('js', () => {
  return gulp.src('src/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'index.js'
      },
    }, compiler))
    // .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('dist'));
});

gulp.task('style', () => {
  return gulp.src('src/styl/**/style.styl')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(stylus({ compress: true }))
    .pipe(postcss([
      autoprefixer({ grid: true })
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

gulp.task('img', () => {
  return gulp.src('src/img/**/*.{jpg,png,svg}')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(imagemin([
      imagemin.optipng(),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('webp', () => {
  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('dist/img'));

});

gulp.task('sprite', () => {
  return gulp.src('src/icons/**/*.*')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy', () => {
  return gulp.src(assetsGlob, { base: 'src' })
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(cached('assets'))
    .pipe(debug({ title: 'copy' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/img/**/*.{jpg,png}', gulp.series('webp'));
  gulp.watch('src/img/**/*.{jpg,png,svg}', gulp.series('img'));
  gulp.watch('src/icons/**/*.*', gulp.series('sprite'));
  gulp.watch('src/styl/**/*.*', gulp.series('style'));
  gulp.watch('src/js/**/*.*', gulp.series('js'));
  gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
});

gulp.task('serve', () => {
  browserSync.init({
    server: './dist'
  });
});

gulp.task('build', gulp.series('clean', 'img', 'webp', 'sprite', 'copy', gulp.parallel('html', 'style', 'js')));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

