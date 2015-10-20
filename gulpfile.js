var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');


var path = {
  app:'middleware/public/src/app.js',
  babel_dest:'middleware/public/dist'
}


gulp.task('transform', function(){

  gulp.src(path.app)
    .pipe(babel())
    .pipe(browserify({
      insertGlobals:true

    }))
    .pipe(gulp.dest(path.babel_dest));

});



gulp.task('default', function (){
  gulp.watch('middleware/public/src/app.js', ['transform']);

});
