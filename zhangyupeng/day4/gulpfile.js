var gulp = require('gulp');
var less = require('gulp-less');
var babelEs6 = require('gulp-babel');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var md5 = require('gulp-md5-plus');
var coll = require('gulp-rev-collector');
var sequence = require('gulp-sequence');
//把ES6的语法改变为es5的语法//同时压缩解析后的js文件
gulp.task('changeToEs5', function() {
    gulp.src('src/js/*.js')
        .pipe(babelEs6({
            presets: "es2015"
        }))
        .pipe(uglify()) //压缩文件
        .pipe(gulp.dest('dist'))
});
//把less文件解析为css文件
gulp.task('testLess', function() {
    gulp.src('src/js/*.less') //读取less
        .pipe(less()) //编译less为css文件
        //.pipe(rev()) //为文件添加后缀名
        .pipe(gulp.dest('dist')) //添加后缀名字文件存放的位置
        //.pipe(rev.manifest()) //产生一个json文件。为最新后缀名
        //.pipe(gulp.dest('view')) //json文件存放的地方
});

// //添加后缀名
// gulp.task('colls', function() {
//     gulp.src(['view/rev-manifest.json', 'index.html'])
//         .pipe(coll({
//             //默认为false
//             replaceReved: true, //后缀名改变后可再次被取代
//         }))
//         .pipe(gulp.dest('./')) //存放修改文件链接后的html文件
// });

//优化版添加前缀
gulp.task('mdName', function() {
    gulp.src('dist/style.css')
        .pipe(md5(10, './index.html'))
        .pipe(gulp.dest('dist'))
})

//监听文件变化---保存时出发watch。
gulp.task('change', function() {
    //有变化执行任务
    gulp.watch('src/js/*.js', ['changeToEs5'])
    gulp.watch('src/js/*.less', ['testLess'])
    gulp.watch('dist/*.css', ['mdName'])
        //gulp.watch('dist/*.css', ['colls'])
})
gulp.task('default', ['change'])