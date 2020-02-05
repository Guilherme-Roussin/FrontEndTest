let { series, src, dest, watch } = require('gulp')
let browserSync = require('browser-sync').create()
let sass = require('gulp-sass')

function _sass(cb) {
    return src(
        [
            'src/scss/*.scss'
        ]
    )
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())

    cb()
}

function copy(cb) {
    return src(
        [
            'src/index.html',
            'src/assets'
        ]
    )
        .pipe(dest('dist'))

    cb()
}

function js(cb) {
    return src(
        [
            'node_modules/slick-carousel/slick/slick.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'src/js/*.js'
        ]
    )
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())

    cb()
}

function serve(cb) {
    browserSync.init({
        server: './dist'
    })

    watch(
        [
            'src/scss/*.scss'
        ]
        , series(_sass)
    )

    watch(
        [
            'src/js/*.js'
        ]
        , series(js)
    )

    watch(
        [
            'src/index.html'
        ]
        , series(copy)
    )

    watch('src/*.html').on('change', browserSync.reload)

    cb()
}

exports.default = series(js, _sass, copy, serve)