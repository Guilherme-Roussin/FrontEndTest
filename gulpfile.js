let {series, src, dest, watch} = require('gulp')
let browserSync = require('browser-sync').create()
let sass = require('gulp-sass')

function _sass(cb){
    return src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())

    cb()
}

function js(cb){
    return src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(dest('src/js'))
    .pipe(browserSync.stream())

    cb()
}

function serve(cb){
    browserSync.init({
        server: './src'
    })

    watch(
        [
            'node_modules/bootstrap/scss/bootstrap.scss',
            'src/scss/*.scss'
        ]
        , series(_sass)
    )

    watch('src/*.html').on('change', browserSync.reload)

    cb()
}

exports.default = series(js, _sass, serve)