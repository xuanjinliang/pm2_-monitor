/**
 * Created by xuanjinliang on 2018/11/07.
 */

const axios = require('axios');

axios({
  method: 'get',
  url: 'http://localhost:3002/stream',
  responseType: 'stream'
}).then(function(response) {
  response.data.pipe(process.stdout)
  /*response.data.on('data', (data) => {
    data = data.toString();
    data= data.split('\n').filter(v => v.length > 0);
    let obj = {};
    data.forEach((o) => {
      const len = o.indexOf(':');

      let key = o.substring(0, len),
        value = o.substring(len + 1).trim();

      if(key && value.length > 0){
        let v;
        try{
          v = JSON.parse(value)
        }catch (e) {
          v = value;
        }
        obj[key] = v;
      }
    });
    console.log(obj);
  }).on('end', () => {
    console.log('end');
  }).on('close', () => {
    console.log('close');
  });*/
}).catch((err) => {
  console.log(err);
});
