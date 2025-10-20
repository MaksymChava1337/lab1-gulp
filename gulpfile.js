const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();


//css task
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



function syncTask(done){

    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port: 3000
    });

    done();
}

function browserReload(done){
    browserSync.reload();
    done();
}

function watchFiles(){
    gulp.watch("./app/scss/**/*", cssTask);
     gulp.watch("./**/*.html", browserReload);
      gulp.watch("./**/*.js", browserReload);
}


// function watchSass(){
//     gulp.watch("./app/**/*", cssTask);
// }
// gulp.task(print);
// gulp.task(cssTask);

gulp.task('default', gulp.parallel(syncTask, watchFiles));
