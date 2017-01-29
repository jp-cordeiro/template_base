'Use Strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
//Concat - Junta todos os arquivos do mesmo tipo em um só
    concat = require('gulp-concat'),
//Uglify
    uglify = require('gulp-uglify'),
//Compressor de imagens
    tinypng = require('gulp-tinypng-compress'),
//Minificador de HTML
    htmlmin = require('gulp-htmlmin'),
//Live Server
    ls = require('gulp-live-server'),
//JS Hint
    jshint = require('gulp-jshint'),
//Hint Stylish
    jstylish = require('jshint-stylish'),
//Browserify
    bf = require('browserify')


//Tarefas executadas por padrão
gulp.task('default',['js','css','libsjs','libscss','htmlmin','watch','serve']);

//Compilador Sass
gulp.task('sass', function () {
    return gulp
        .src('dev/scss/*.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(gulp.dest('prod/css'))
});

//Watch Sass
gulp.task('sass:watch',function () {
    gulp.watch('dev/scss/*.scss',['sass']);
});

//Uglify JS
gulp.task('js', function () {
    return gulp
        .src('dev/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('prod/js'))
});

//CSS
gulp.task('css', function () {
    return gulp
        .src('dev/css/**/*.css')
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('prod/css'))
});

//Uglifica e Concatena as Libs externas com o JS
gulp.task('libsjs', function () {
    return gulp
        .src('dev/libs/**/*.js')
        .pipe(concat('libsjs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('prod/libs/js'))
});

gulp.task('libscss', function () {
    return gulp
        .src('dev/libs/**/*.css')
        .pipe(concat('libscss.min.css'))
        .pipe(gulp.dest('prod/libs/css'))
});

//Minificador de HTML
gulp.task('htmlmin', function() {
    return gulp.src('dev/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('prod'));
});

//Watch
gulp.task('watch', function() {
    gulp.watch('dev/scss/*.scss',['sass']);
'Use Strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
//Concat - Junta todos os arquivos do mesmo tipo em um só
    concat = require('gulp-concat'),
//Uglify
    uglify = require('gulp-uglify'),
//Compressor de imagens
    tinypng = require('gulp-tinypng-compress'),
//Minificador de HTML
    htmlmin = require('gulp-htmlmin'),
//Live Server
    ls = require('gulp-live-server'),
//JS Hint
    jshint = require('gulp-jshint'),
//Hint Stylish
    jstylish = require('jshint-stylish'),
//Browserify
    bf = require('browserify'),
//Minifica CSS
    cssmin = require("gulp-cssmin"),
//Remove comentário CSS
    stripCssComments = require('gulp-strip-css-comments')


//Tarefas executadas por padrão
gulp.task('default',['js','css','libsjs','libscss','htmlmin','watch','serve']);

//Compilador Sass
gulp.task('sass', function () {
    return gulp
        .src('dev/scss/*.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(gulp.dest('prod/css'))
});

//Watch Sass
gulp.task('sass:watch',function () {
    gulp.watch('dev/scss/*.scss',['sass']);
});

//Uglify JS
gulp.task('js', function () {
    return gulp
        .src('dev/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('prod/js'))
});

//CSS
gulp.task('css', function () {
    return gulp
        .src('dev/css/**/*.css')
        .pipe(concat('style.min.css'))
        .pipe(stripCssComments({all: true}))
        .pipe(cssmin())
        .pipe(gulp.dest('prod/css'))
});

//Uglifica e Concatena as Libs externas em JS
gulp.task('libsjs', function () {
    return gulp
        .src('dev/libs/**/*.js')
        .pipe(concat('libsjs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('prod/libs/js'))
});
    
//Concatena e Minifica as Libs externas em CSS
gulp.task('libscss', function () {
    return gulp
        .src('dev/libs/**/*.css')
        .pipe(concat('libscss.min.css'))
        .pipe(gulp.dest('prod/libs/css'))
});

//Minificador de HTML
gulp.task('htmlmin', function() {
    return gulp.src('dev/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('prod'));
});

//Watch
gulp.task('watch', function() {
    gulp.watch('dev/scss/*.scss',['sass']);
    gulp.watch('dev/js/**/*.js',['js']);
    gulp.watch('dev/css/**/*.css',['css']);
    gulp.watch('dev/**/*.html',['htmlmin']);
});

//Server e Live Reload
gulp.task('serve', function () {
    var server = ls.static('prod',3000);
    server.start();

    /**
     * Live Reaload
     */

    //Define a pasta dos arquivos que serão obeservados, passando um parâmetro
    gulp.watch('prod/css/**/*.css', function (css) {
        //Aplica a notificação ao servidor informando o arquivo alterado
        ls.notify.apply(server,[css]);
    });

    //Define a pasta dos arquivos que serão obeservados, passando um parâmetro
    gulp.watch('prod/js/**/*.js', function (js) {
        //Aplica a notificação ao servidor informando o arquivo alterado
        ls.notify.apply(server,[js]);
    });

    //Define a pasta dos arquivos que serão obeservados, passando um parâmetro
    gulp.watch('prod/libs/js/**/*.js', function (js) {
        //Aplica a notificação ao servidor informando o arquivo alterado
        ls.notify.apply(server,[js]);
    });

    //Define a pasta dos arquivos que serão obeservados, passando um parâmetro
    gulp.watch('prod/libs/css/**/*.css', function (css) {
        //Aplica a notificação ao servidor informando o arquivo alterado
        ls.notify.apply(server,[css]);
    });

    //Define a pasta dos arquivos que serão obeservados, passando um parâmetro
    gulp.watch('prod/**/*.html', function (html) {
        //Aplica a notificação ao servidor informando o arquivo alterado
        ls.notify.apply(server,[html]);
    });
})

//JS Hint - Auxilia a debugar o JS
gulp.task('hint', function () {
    return gulp.src('dev/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jstylish))
})

// gulp.task('tinypng', function () {
//     return gulp
//         .src('dev/images/**/*.{jpg,jpeg}')
//         .pipe(tinypng({
//             key: 'keyAPI',
//             sigFile: 'images/.tinypng-sigs',
//             log: true
//         }))
//         .pipe(gulp.dest('prod/assets/images'));
// });
