/**
 * Created by xuanjinliang on 2018/11/09.
 */

const pm2Script = require('../pm2Script/index');

module.exports = (server) => {
  let io = require('socket.io')(server, {
    path: '/socket',
    serveClient: false
  });

  io.on('connection', (socket) => {

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
