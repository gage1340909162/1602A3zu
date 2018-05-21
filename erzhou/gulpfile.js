var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var data = require('./data.json');
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(server({
            host: "localhost",
            port: 8005,
            livereload: true,
            middleware: function(req, res, next) {
                if (url.parse(req.url, true).pathname === '/page') {
                    res.end(JSON.stringify(data));
                }
                next();
            }
        }));
});
gulp.task('default', ['webserver']);