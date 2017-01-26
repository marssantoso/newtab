var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var prefix = require('gulp-autoprefixer');
var srcmap = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('sass', function(){
  return gulp.src('app/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix())
    // .pipe(prefix({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/*.js', browserSync.reload);
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js',uglify({ mangle: false })))
    .pipe(gulp.dest('dist'));
});

gulp.task('mapCss', function() {
  return gulp.src('app/css/style.css')
    .pipe(srcmap.init())
    .pipe(concat('style.min.css'))
    .pipe(srcmap.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copyCss', function() {
  return gulp.src('app/css/materialdesignicons.min.css').pipe(gulp.dest('dist/css'));
});

gulp.task('copyNg', function() {
  return gulp.src('app/js/angular*').pipe(gulp.dest('dist/js'));
});

gulp.task('copyJson', function() {
  return gulp.src('app/*.json').pipe(gulp.dest('dist'));
});

gulp.task('copyParts', function() {
  return gulp.src('app/parts/*').pipe(gulp.dest('dist/parts'));
});

gulp.task('copyFonts', function() {
  return gulp.src('app/fonts/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('default', function(callback){
  runSequence(['sass', 'browserSync', 'watch'], callback);
});

gulp.task('build', function(callback){
  console.log('Building...');
  runSequence(
    'clean:dist', 'sass', 'mapCss', 'useref',
    ['copyFonts', 'copyParts', 'copyCss', 'copyNg', 'copyJson'],
    callback
  );
});