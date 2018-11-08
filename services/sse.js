/**
 * Created by xuanjinliang on 2018/10/25.
 */

const SSE = require('../common/sse');
const pm2Script = require('../pm2Script/index');

let ssePool = [],
  maxClients = 1000; //最大允许连接数

module.exports = async (ctx, next) => {

  if(ssePool.length >= maxClients){
    return await next();
  }

  let sse = new SSE(ctx);
  ssePool.push(sse);

  let interval = null;

  sse.on('finish', () => {
    ssePool.splice(ssePool.indexOf(sse), 1);
  });

  /*sse.on('end', () => {
    console.log('end');
    clearInterval(interval);
  });

  sse.on('close', () => {
    console.log('close');
    clearInterval(interval);
  });*/

  interval = setInterval(() => {
    pm2Script.getPm2List().then((result) => {
      sse.send({data:result});
    });
  }, 3000);

  ctx.req.on('close', () => {
    sse.end();
    clearInterval(interval);
  });

  ctx.body = sse;
};
