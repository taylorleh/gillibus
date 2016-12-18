const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const less = require('gulp-less');
const nodemon = require('gulp-nodemon');



const paths = {
  BOWER:"client/lib",
  FONTS: "./client/assets/fonts",
  FONT_AWESOME_OUT: "./client/less/font-awesome"
};





// gulp.task('fonts', function() {
//   gulp.src(fontAwesome.fonts)
//     .pipe(gulp.dest(paths.FONTS));
// });


gulp.task('fonts', function() {
  return gulp.src(paths.BOWER + '/font-awesome/**/*.*')
    .pipe(gulp.dest(paths.FONT_AWESOME_OUT));
});


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




