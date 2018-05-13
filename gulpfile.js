var gulp = require("gulp");
var server = require("gulp-webserver");
var sequence = require("gulp-sequence");
var less = require("gulp-less");
var mincss = require("gulp-clean-css");
var minjs = require("gulp-uglify");
var minhtml = require("gulp-htmlmin");
gulp.task("webserver", function() {
    return gulp.src("dist")
        .pipe(server({
            host: "localhost",
            port: 8080,
            livereload: true,
            middleware: function(req, res, next) {
                next();
            }
        }))
});
gulp.task("testless", function() {
    return gulp.src("src/css/style.less")
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest("dist/css"));
});
gulp.task("testhtml", function() {
    return gulp.src("src/index.html")
        .pipe(minhtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist"))
})
gulp.task("default", sequence(["testless", "testhtml"], "webserver"));