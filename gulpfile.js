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


gulp.task('watch-less', function() {
  return gulp.watch(__dirname + '/client/less/**/*.less', ['less']);
});



gulp.task('wp-proxy-less', function() {
  // gulp.watch(__dirname + '/client/less/**/*.less', ['less']);
  nodemon({
    watch: ['client/less'],
    ignore:['node_modules', 'client/lib', 'client/assets'],
    ext: 'less',
    tasks: ['less']
  });
});

gulp.task('watch-server', function() {
  nodemon({
    watch: ['server', 'server.js'],
    ignore: ['node_modules', './client'],
    ext: 'js'
  })
});

gulp.task('default', function() {
  // gulp.watch(__dirname + '/client/less/**/*.less', ['less']);
  nodemon({
    ignore:['node_modules', 'client/lib', 'client/assets'],
    ext: 'js html less',
    tasks: ['less']
  })
});




