/**
 * Created by xuanjinliang on 2018/10/25.
 */


module.exports = async (ctx) => {
  // ctx.sse is a writable stream and has extra method 'send'
  ctx.sse.send('a notice');
  ctx.sse.end();
};
