var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ghPages = require('gulp-gh-pages');


gulp.task('server', function(){
  connect.server({
    livereload: true
  }); 
})

gulp.task('browserify', function (){
  return browserify('./src/scripts/app.js')
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/scripts/'))
  .pipe(connect.reload());
});

gulp.task('minifyjs', function (){
  gulp.src('./src/scripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build/scripts/'));
});
 
gulp.task('html', function(){
  gulp.src('./*.html')
  .pipe(connect.reload());
});

gulp.task('imagemin', function () {
  var imgSrc = './scr/images/**/*',
      imgDst = './build/images/**/*';
  gulp.src(imgSrc)
  .pipe(changed(imgDst))
  .pipe(imagemin())
  .pipe(gulp.dest(imgDst));
})

gulp.task('style', function() {
  gulp.src('./src/styles/*.scss')
  .pipe(sass())
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('./build/styles/'))
  .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('./src/styles/*.scss', ['style']);
  gulp.watch('./src/scripts/*.js', ['browserify']);
  gulp.watch(['./*.html'],['html']); 
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ["server", "watch"]);


// npm install gulp gulp-autoprefixer gulp-autoprefixer gulp-changed gulp-connect gulp-imagemin gulp-plumber gulp-sass vinyl-source-stream gulp-uglify browserify --save-dev
// npm install jquery underscore --save