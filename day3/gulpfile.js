var gulp = require('gulp');
var less = require('gulp-less');
gulp.task('testless', function() {
    gulp.src('src/css/style.less', { base: 'src/css' })
        .pipe(less())
        .pipe(gulp.dest('dist'))
})
gulp.task('default', ['testless'])