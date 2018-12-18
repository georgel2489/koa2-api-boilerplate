const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const cors = require('koa-cors');

const errorHandler = require('./libraries/error_handler');
const config = require('./env');

const app = new Koa();

// enable cors
app.use(cors());

// static files
app.use(require('koa-static')('./public'));

// request parameters parser
app.use(require('koa-body')({
    formidable: {
        uploadDir: `${__dirname}/public/uploads`, // This is where the files will be uploaded
        keepExtensions: true,
    },
    multipart: true,
    urlencoded: true,
}));

// error handler
app.use(errorHandler);

// validator
require('koa-validate')(app);

// set routes
fs.readdirSync('./app').filter(file => fs.statSync(path.join('./app', file)).isDirectory()).forEach((moduleName) => {
    fs.readdirSync(`./app/${moduleName}`).filter(file => fs.statSync(path.join(`./app/${moduleName}`, file)).isFile()).forEach((route) => {
        app.use(require(`./app/${moduleName}/${route}`).routes());
    });
});

app.listen(config.server.port, () => {
    console.log(`API listening on port ${config.server.port}`);
});
