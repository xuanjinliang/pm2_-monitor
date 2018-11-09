/**
 * Created by xuanjinliang on 2018/11/08.
 */

const stream = require('stream');
const Transform = stream.Transform;
const _ = require('lodash');

class SendStream extends Transform {
  constructor() {
    super({
      writableObjectMode: true
    });
  }

  filter(data){
    if(_.isPlainObject(data)){
      return JSON.stringify(data)
    }

    return data.toString();
  }

  send(data, encodeURI = 'utf-8', callback) {
    this.write(data, encodeURI, callback);
  }

  _transform(data, encoding, callback) {
    let msgData = this.filter(data);
    this.push(msgData);
    callback();
  }
}

module.exports = SendStream;
