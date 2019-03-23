const {src, dest, task, watch, series} = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();

function sass(){
    return src('src/sass/**/*.scss')
        .pipe(gulpSass())
        .pipe(dest('src/css/'))
}

function html(){
    return src('src/**/*')
        .pipe(dest('src'))
}

//Código comentado retirar /* do caminho
/*function watch_files(done){
    watch('src/sass/**//*/*.scss', sass);
    
    done();
}*/


function serve(done){
    browserSync.init({
        server:{
            baseDir: 'src',
        }
    });
    watch('src/sass/**/*.scss', sass);
    watch('src/css/').on('change', browserSync.reload);
    done();
}

//task(sass);
//task(watch_files);

exports.html = html;
exports.sass = sass;
exports.serve = serve;

var build = series(html, sass, serve);
var syncWeb = build;
task('default', syncWeb);





