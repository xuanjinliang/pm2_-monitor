/**
 * Created by xuanjinliang on 2018/11/09.
 */

const pm2Script = require('../pm2Script/index');
const config = require('../common/config');
const ipFilter = require('../common/ipFilter');

module.exports = (server) => {
  let io = require('socket.io')(server, {
    path: '/socket',
    serveClient: false,
    origins: (() => {
      let ori = config.productionDomain;
      if(process.env.NODE_ENV == config.DEV){
        ori = config.devDomain;
      }else if(process.env.NODE_ENV == config.TEST){
        ori = config.testDomain;
      }
      return ori;
    })()
  });

  io.on('connection', (socket) => {

    if(!ipFilter(socket)){
      socket.disconnect(true);
      return;
    }

    /*socket.on('disconnect', function(){
      console.log('user disconnected');
    });*/

    /*setInterval(function(){
      socket.emit('list', {aa: 12312});
    }, 3000);*/

    setInterval(() => {
      pm2Script.getPm2List().then((result) => {
        socket.emit('list', {data:result});
      });
    }, 3000);

    /*socket.on('message', (msg) => {
      console.log(`message: ${msg}`);
    });*/
  });
};
