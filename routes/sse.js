/**
 * Created by xuanjinliang on 2018/10/25.
 */

const router = require('koa-router')();
const sseServer = require('../services/sse');
const setCrossOrigin = require('../common/setCrossOrigin');

router.get('/sse', async (ctx, next) => {
  setCrossOrigin(ctx);
  await sseServer(ctx, next);
});

module.exports = router;
