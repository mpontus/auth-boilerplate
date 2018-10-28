const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.build.json');

/**
 * Copy non-source files to the destination directory.
 */
gulp.task('copy-files', () =>
  gulp.src(['./src/**/*', '!./**/*.ts', '!./**/*.js']).pipe(gulp.dest('dist')),
);

/**
 * Transpile source files
 */
gulp.task('build', () =>
  gulp
    .src(['./src/**/*.ts', '!./**/*.spec.*', '!./**/*.test.*'])
    .pipe(tsProject())
    .pipe(gulp.dest('dist')),
);

gulp.task('default', ['build', 'copy-files']);
