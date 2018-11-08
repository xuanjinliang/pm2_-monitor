/**
 * Created by xuanjinliang on 2018/10/25.
 */

const PassThrough = require('stream').PassThrough;
const SSE = require('../common/sse');
const pm2Script = require('../pm2Script/index');

module.exports = async (ctx, next) => {

  let sse = new SSE(ctx);
  let interval = null;

  sse.on('finish', () => {
    console.log('finish');
    clearInterval(interval);
    //sse.end();
  });

  sse.on('end', () => {
    console.log('end');
    clearInterval(interval);
  });

  sse.on('close', () => {
    clearInterval(interval);
  });

  interval = setInterval(() => {
    sse.send({data:{aa:123}});
    //sse.end();
  }, 3000);


  ctx.body = sse.on('error', ctx.onerror).pipe(PassThrough());

  /*await next();
  await sse.send({data:{aa:123}});
  await sse.end();*/
  /*setInterval(() => {
    ctx.sse.send('a notic');
  }, 3000);*/

  // ctx.sse is a writable stream and has extra method 'send'
 /* let interval = setInterval(() => {
    ctx.sse.send({data:{aa:123}});
  }, 3000);

  ctx.sse.on('close', (...args) => {
    clearInterval(interval)
  });*/

  //ctx.sse.end();

  /*pm2Script.getPm2List().then((result) => {
    ctx.sse.send('a notice');
    ctx.sse.end();
  }).catch(() => {
    ctx.sse.end();
  });*/
  //ctx.body = {a: 123};
};
