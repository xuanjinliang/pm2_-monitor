/**
 * Created by xuanjinliang on 2018/11/09.
 */

const socket = require('socket.io-client')('ws://localhost:8001', {
  path: '/socket'
});

socket.on('connect', () => {
  console.log('connect');
});
socket.on('event', (data) => {
  console.log('event', data);
  socket.emit('message', '43214');
});
socket.on('disconnect', () => {
  console.log('disconnect');
});
