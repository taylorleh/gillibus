const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const less = require('gulp-less');
const nodemon = require('gulp-nodemon');




gulp.task('less', function() {
  return gulp.src('./client/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname,'includes' )]
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./client/assets'))
});



gulp.task('default', function() {
  // gulp.watch(__dirname + '/client/less/**/*.less', ['less']);
  nodemon({
    ignore:['node_modules', 'client/lib', 'client/assets'],
    ext: 'js html less',
    tasks: ['less']
  })
});




