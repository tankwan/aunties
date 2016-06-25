var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var spawn = require('child_process').spawn;
var bunyan

gulp.task('development', function() {
    process.env.NODE_ENV='development'
    nodemon({
        script: 'server.js',
        ext:    'html js css',
        ignore: ['node_modules/'],
        stdout:   false,
        readable: false
    })
    .on('readable', function() {

        // free memory
        bunyan && bunyan.kill()

        bunyan = spawn('./node_modules/bunyan/bin/bunyan', ['--color'])

        bunyan.stdout.pipe(process.stdout)
        bunyan.stderr.pipe(process.stderr)

        this.stdout.pipe(bunyan.stdin)
        this.stderr.pipe(bunyan.stdin)
    });
})

gulp.task('default', ['development'], function(){});
