var webserver = require('gulp-webserver');
var gulp = require('gulp')
var urlTool = require('url');
var sequence = require('gulp-sequence');
var minCss = require('gulp-minify-css');
var babel = require('gulp-babel');
var minJs = require('gulp-uglify');
var minHtml = require('gulp-htmlmin');
//编译js的ES6语言到ES5，不然不能压缩js。不识别ES6
gulp.task('changeES6', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(gulp.dest('dist/js'))
});
//压缩css
gulp.task('mincss', function() {
    return gulp.src('src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('dist/css'))
});
//压缩js
gulp.task('minjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(minJs())
        .pipe(gulp.dest('dist/js'))
});
//压缩html
gulp.task('minhtml', function() {
    return gulp.src('src/index.html')
        .pipe(minHtml({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
});
//起服务器。
gulp.task('server', function() {
    return gulp.src('dist')
        .pipe(webserver({
            host: 'localhost',
            port: 3000,
            livereload: true, //实时更新
            //open: ture,
            middleware: function(req, res, next) { //拦截请求
                //next 执行下一个
                var pathN = urlTool.parse(req.url).pathname;
                if (pathN === '/favicon.ico') { return; };
                // if (pathN === '路径') {
                //     res.writeHead(200, {
                //         'Content-Type': 'text/plain;charset=utf8'
                //     })
                //     res.end('您连接上了');
                //     next()
                // }
                //console.log(pathN)
                next()
            }
        }))
});
gulp.task('default', function(cb) {
    sequence('changeES6', ['mincss', 'minjs', 'minhtml'], 'server', cb)
})