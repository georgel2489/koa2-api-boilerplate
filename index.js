const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./libraries/error_handler')

// documentation
app.use(require('koa-static')('./public'));

// request parameters parser
app.use(bodyParser());

// error handler
app.use(errorHandler);

// set routes
fs.readdirSync('./app').filter( file => fs.statSync(path.join('./app', file)).isDirectory()).map(moduleName => {
    fs.readdirSync('./app/' + moduleName + '/routes').filter( file => fs.statSync(path.join('./app/' + moduleName + '/routes', file)).isFile()).map(route => {
        app.use(require('./app/' + moduleName + '/routes/' + route).routes());
    })
});

app.listen(3000);