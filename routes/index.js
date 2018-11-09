const router = require('koa-router')();
const Stream = require('stream');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  console.log(ctx.body instanceof Stream);
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
