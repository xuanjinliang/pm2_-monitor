/**
 * Created by xuanjinliang on 2018/11/06.
 */

const stream = require('stream');
const Transform = stream.Transform;
const _ = require('lodash');

class SSETransform extends Transform {
  constructor(ctx, opts = {}) {
    super({
      writableObjectMode: true
    });

    this.ctx = ctx;
    this.opts = opts;
    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    this.send(':ok');
  }

  filter(data){
    let obj = {
      data: '',
      retry: 10 * 1000
    };

    if(_.isString(data)){
      obj.data = data;
    }else if(_.isPlainObject(data)){
      _.assign(obj, data);

      if(_.isPlainObject(obj.data) || Array.isArray(obj.data)){
        obj.data = JSON.stringify(obj.data);
      }
    }
    return obj;
  }

  send(data, encodeURI = 'utf-8', callback) {
    this.write(data, encodeURI, callback);
  }

  end(data, encodeURI = 'utf-8', callback){
    let senderObject = this.filter(data);
    senderObject.event = 'close';

    if(!this.writable){
      return;
    }

    Transform.prototype.end.call(this, senderObject, encodeURI, callback);
  }

  _transform(data, encoding, callback) {
    let senderObject = this.filter(data),
      resultArray = [],
      commentReg = /^\s*:\s*/;

    if (senderObject.event) resultArray.push(`event: ${senderObject.event}`);
    if (senderObject.retry) resultArray.push(`retry: ${senderObject.retry}`);
    if (senderObject.id) resultArray.push(`id: ${senderObject.id}`);

    if (senderObject.data.search(commentReg) !== -1) {
      senderObject.data = senderObject.data.replace(commentReg, '');
      resultArray.push(`: ${senderObject.data}`);
    }else{
      resultArray.push(`data: ${senderObject.data}`);
    }

    this.push(resultArray.join('\n') + '\n\n');
    callback();
  }
  _final(done){
    this.push('');
    done();
  }
}


/*let sseTransform = new SSETransform();
sseTransform.on('finish', () => {
  console.log('finish');
});
sseTransform.pipe(process.stdout);
sseTransform.send({data:{aa:123}});
sseTransform.send('321');
sseTransform.end();*/

module.exports = SSETransform;
