const {src, dest, task, watch, series} = require('gulp');
const gulpSass = require('gulp-sass');
const include = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();


function copy(){
    return src(['src/components/**/*', 'src/css/**/*', 'src/javascript/**/*', 'src/imagens/**/*'], {'base': 'src'})
        .pipe(dest('dist/'))
}

function sass(){
    return src('src/sass/**/*.scss')
        .pipe(gulpSass())
        .pipe(dest('dist/css/'))
}

function html(){
    return src('src/*.html')
        .pipe(include())
        .pipe(dest('dist/'))
}

//Código comentado retirar /* do caminho
/*function watch_files(done){
    watch('src/sass/**//*/*.scss', sass);
    
    done();
}*/


function serve(done){
    browserSync.init({
        server:{
            baseDir: 'dist',
        }
    });
    watch('src/', sass);
    watch('src/**/*.html', html)
    watch('dist/**/*').on('change', browserSync.reload);
    done();
}

//task(sass);
//task(watch_files);

exports.copy = copy;
exports.html = html;
exports.sass = sass;
exports.serve = serve;

var build = series(copy, html, sass, serve);
var syncWeb = build;
task('default', syncWeb);





