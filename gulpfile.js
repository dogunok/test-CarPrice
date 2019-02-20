const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel')


const path = {
    js:'src/js/*.js',
    less: 'src/**/*.less',
    build: 'public'
}

gulp.task('style', () => {
    return gulp.src(path.less)
    .pipe(less())
    .pipe(gulp.dest(path.build))
    
})

gulp.task('script', () => {
    return gulp.src(path.js)
      .pipe(babel())
      .pipe(gulp.dest(path.build))
})

gulp.task('watchAll', () => {
    gulp.watch(path.less, gulp.series('style'))
    gulp.watch(path.js, gulp.series('script'))   
})

  
  gulp.task('default', gulp.parallel('watchAll'))