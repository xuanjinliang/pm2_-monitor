/**
 * Created by xuanjinliang on 2018/11/08.
 */

const router = require('koa-router')();
const streamServer = require('../services/stream');
//const setCrossOrigin = require('../common/setCrossOrigin');

router.get('/stream', async (ctx, next) => {
  //setCrossOrigin(ctx);
  await streamServer(ctx, next);
});

module.exports = router;
