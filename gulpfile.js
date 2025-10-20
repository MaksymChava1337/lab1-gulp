const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function cssTask(done){
    gulp.src('./app/scss/style.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
    done();
}


function jsTask(done) {
  gulp.src('app/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
  done(); 
}

function optimizeImages(done) {
  gulp.src('app/imgs/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [{ removeViewBox: false }]
      })
    ]))
    .pipe(gulp.dest('dist/img'));
  done();
}


//browser sync task
function syncTask(done){
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port: 3000
    });
    done();
}
 //обновляє сторінку
function browserReload(done){
    browserSync.reload();
    done();
}


//відсліковує зміни у всіх файлах з певними розширеннями і "дає сигнал" для браузер сінка що треба оновити сторінку
function watchFiles(){
    gulp.watch("./app/scss/**/*", cssTask);
     gulp.watch("./**/*.html", browserReload);
      gulp.watch("./**/*.js", jsTask);
}

gulp.task('default', gulp.parallel(syncTask, watchFiles));

gulp.task('optimizeImages', optimizeImages);