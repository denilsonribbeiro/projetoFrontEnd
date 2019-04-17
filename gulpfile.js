const {src, dest, task, watch, series} = require('gulp');
const gulpSass = require('gulp-sass');
const include = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();

function copy(){
    return src(['src/components/**/*', 'src/css/**/*', 'src/imagens/**/*'], {'base': 'src'})
        .pipe(dest('dist/'))
}

function sass(){
    return src('src/sass/**/*.scss')
        .pipe(gulpSass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(dest('dist/css/'))
}

function html(){
    return src('src/*.html')
        .pipe(include())
        .pipe(dest('dist/'))
}

function css(){
    return src('dist/components/**/*.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/components/'))
}

function js(){
    return src('src/javascript/**/*')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/javascript/'))
}

function imgmin(){
    return src('src/imagens/*')
        .pipe(imagemin())
        .pipe(dest('dist/imagens/'))
}

function serve(done){
    browserSync.init({
        server:{
            baseDir: 'dist',
        }
    });
    watch('src/', sass);
    watch('src/**/*.html', html)
    watch('src/css/**/*.css', css)
    watch('src/javascript/**/*', js)
    watch('src/imagens/**/*', imgmin)
    watch('dist/**/*').on('change', browserSync.reload);
    done();
}

//task(sass);
//task(watch_files);

exports.copy = copy;
exports.html = html;
exports.sass = sass;
exports.css = css;
exports.js = js;
exports.imgmin = imgmin;
exports.serve = serve;

var build = series(copy, html, sass, css, js, imgmin, serve);
var syncWeb = build;
task('default', syncWeb);





