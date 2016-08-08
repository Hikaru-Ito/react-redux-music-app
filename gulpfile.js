'use strict'

/*
  Import Dependencies
*/
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')
const browserSync = require('browser-sync')
const reload = browserSync.reload

/*
  Target source pathes
*/
const paths = {
  RUN_SCRIPT: './run.js',
  APP_ENTRY: './server/index.es6',
  APP_SCRIPTS: './server/**/*.es6',
  BUILD_SCRIPT: {
      NAME: 'index.js',
      DIR: './build'
  }
}

const SERVER_LOAD_TIME = 2500
const APPPORT          = 1089
const PROXYPORT        = 5656

/*
  Gulp Tasks
*/

// babel
gulp.task('babel', () => {
  gulp.src(paths.APP_SCRIPTS)
    .pipe(babel())
    .pipe(gulp.dest(paths.BUILD_SCRIPT.DIR))
})

// Local Proxy Serving
gulp.task('browsersync', ['nodemon'], () => {
  browserSync.init({
    files: ['server/views/**/*.*'],
    proxy: 'http://localhost:'+APPPORT,
    port: PROXYPORT,
    open: false
  })
})

// Process auto Launch
gulp.task('nodemon', cb => {
  let started = false;

  return nodemon({
    script: paths.RUN_SCRIPT,
    env: {
      'NODE_ENV': 'development'
    },
    ext: 'es6',
    ignore: ['./public', './node_modules']
  })
  .on('start', () => {
    if(!started) {
      started = true;
      cb();
      setTimeout(() => {
        reload()
      }, SERVER_LOAD_TIME)
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload()
    }, SERVER_LOAD_TIME)
  })

})

gulp.task('default', ['browsersync'])
gulp.task('build', ['babel'])
