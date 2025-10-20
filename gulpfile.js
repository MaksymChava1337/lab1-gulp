const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');


//css task
function cssTask(done){
    gulp.src('./app/scss/style.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'));
    done();
}


gulp.task(cssTask);