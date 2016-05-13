import gulp from 'gulp';
import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import assign from 'object-assign';

import browserify from 'browserify';

import watchify from 'watchify';
import babelify from 'babelify';
import del from 'del';

gulp.task('copy-i18n', ['copy-lib'], () => {
    return gulp.src([
            'demo/i18n/*.json'
        ])
        .pipe(gulp.dest('public/i18n'));
});

gulp.task('copy-lib', ['copy'], () => {
    return gulp.src([
            'node_modules/numbro/dist/languages.js',
            'node_modules/numbro/dist/numbro.js',
            'node_modules/moment/min/moment-with-locales.min.js',
            'node_modules/moment/min/moment.min.js'
        ])
        .pipe(gulp.dest('public/lib'));
});

gulp.task('copy', () => {
    return gulp.src([
            'demo/index.html'
        ])
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['copy-i18n'], () => {
    const b = browserify('demo/demo.js', { debug: true })
        .transform(babelify);
    return bundle(b);
});

gulp.task('watch', () => {
    const b = browserify('demo/demo.js', assign({ debug: true }, watchify.args))
        .transform(babelify);
    const w = watchify(b)
        .on('update', () => bundle(w))
        .on('log', gutil.log);
    return bundle(w)
});

gulp.task('clean', () => {
    return del('public');
});

gulp.task('default', ['clean'], () => {
    gulp.run(['copy-i18n', 'watch']);
});

function bundle(b) {
    return b.bundle()
        .on('error', (e) => {
            console.error(e.stack);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public'));
}
