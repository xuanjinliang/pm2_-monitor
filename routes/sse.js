/**
 * Created by xuanjinliang on 2018/10/25.
 */

const router = require('koa-router')();
const sseServer = require('../services/sse');
const setCrossOrigin = require('../common/setCrossOrigin');
const ipFilter = require('../common/ipFilter');

router.get('/sse', async (ctx, next) => {
  if(!ipFilter(ctx)){
    return await next();
  }
  setCrossOrigin(ctx);
  await sseServer(ctx, next);
});

module.exports = router;
