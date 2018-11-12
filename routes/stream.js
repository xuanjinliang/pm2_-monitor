/**
 * Created by xuanjinliang on 2018/11/08.
 */

const router = require('koa-router')();
const streamServer = require('../services/stream');
const ipFilter = require('../common/ipFilter');

router.get('/stream', async (ctx, next) => {
  if(!ipFilter(ctx)){
    return await next();
  }
  await streamServer(ctx, next);
});

module.exports = router;
