/**
 * Created by xuanjinliang on 2018/11/08.
 */

const PassThrough = require('stream').PassThrough;
const SendStream = require('../common/sendStream');

module.exports = (ctx) => {

  let sendStream = new SendStream();

  setInterval(() => {
    sendStream.send({aa:123});
  }, 3000);

  ctx.body = sendStream.on('error', ctx.onerror).pipe(PassThrough());
};
