const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const clearConsole = require('clear');
const apidoc = require('gulp-apidoc');

const script = 'index.js';

const restartServer = () => gulp.src(script).pipe(livereload());

livereload.listen();

const generateDocumentation = () => apidoc({
    src: 'app/',
    dest: 'public/apidoc/',
    config: './',
    debug: false,
    includeFilters: ['.*\\.js$'],
}, () => {

});

const serverRestart = () => nodemon({
    script,
    ignore: ['public/*'],
}).on('restart', () => {
    clearConsole();
    generateDocumentation();
    restartServer();
});

gulp.task('default', gulp.parallel(generateDocumentation, serverRestart));
