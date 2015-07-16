var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var svgmin   = require('gulp-svgmin');
var svgStore = require('gulp-svgstore');
var rename   = require('gulp-rename');
var cheerio  = require('gulp-cheerio');
var config   = require('../config');

gulp.task('svg-store', function() {
    return gulp.src(config.src.svg + '/icons/*.svg')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(svgmin({
        js2svg: {
            pretty: true
        },
        plugins: [{
            removeDesc: true
        }, {
            cleanupIDs: true
        }, {
            mergePaths: false
        }]
    }))
    .pipe(cheerio({
        run: function($, file) {
            $('[fill]:not([fill="currentColor"])').removeAttr('fill');
        },

        parserOptions: {
            xmlMode: true
        }
    }))
    .pipe(rename({
        prefix: 'icon-'
    }))
    .pipe(svgStore({
        inlineSvg: false
    }))
    .pipe(rename({
        basename: 'sprite'
    }))
    .pipe(gulp.dest(config.dest.img));
});
