const {src, dest, task, watch} = require('gulp');
const gulpSass = require('gulp-sass');

function sass(){
    return src('src/sass/**/*.scss')
            .pipe(gulpSass())
            .pipe(dest('src/css/'))
}

function watch_files(done){
    watch('src/sass/**/*.scss', sass);
    
    done();
}

task(sass);
task(watch_files);
