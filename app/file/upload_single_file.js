const router = require('koa-router')();
const path = require('path');

const auth = require('../../middlewares/auth');
const config = require('../../env');

const { BadRequest } = require('../../libraries/error');

/**
 * @api {post} /upload-file Upload File
 * @apiVersion 1.0.0
 * @apiGroup File
 * @apiName UploadFile
 * @apiHeader {String} token token
 */

router.post('/upload-file', auth, async (ctx, next) => {
    if (ctx.headers['content-type'].includes('multipart/form-data;')) {
        // content type is for data, so validate the file
        await ctx.checkFile('file').notEmpty('File field is required').suffixIn(['jpg', 'jpeg', 'png']).size(1, 1024 * 1024);
        if (ctx.errors) throw new BadRequest(ctx.errors);
        await next();
    } else {
        throw new BadRequest([{
            'Content-Type': 'Content type must be multipart/form-data',
        }]);
    }

    const fileName = path.basename(ctx.request.body.files.file.path);

    // send file location
    ctx.body = {
        location: `${config.server.url}/uploads/${fileName}`,
    };
});

module.exports = router;
