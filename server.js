// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/version', (req, res) => {
  res.json({"version":"demo"});
});

io.on('connection', (socket) => {
  console.log('Peer Connected');
  
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
