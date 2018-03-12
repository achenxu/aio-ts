'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const tslint = require('gulp-tslint');

const sources = {
  scripts: {
    src: 'lib/**/*.ts',
    dest: 'dist/'
  }
};

gulp.task('clean', () => {
  gulp.src('dist/')
    .pipe(clean())
});

gulp.task('lint', () => {
  gulp.src(sources.scripts.src)
    .pipe(tslint({
      formatter: 'verbose',
      configuration: 'tslint.json'
    }))
    .pipe(tslint.report())
});

gulp.task('build', ['lint', 'clean']);
