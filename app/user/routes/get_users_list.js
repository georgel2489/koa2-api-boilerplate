var router = require('koa-router')();
let User = require('../model')
let auth = require('../../../middlewares/auth')

router.get('/users', async(ctx, next) => {
    ctx.body = await User.get()
})

module.exports = router