const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const devices = require('./devices');

app.use(cors());
app.use(express.json());

app.get('/consumption', devices.getConsumption);


io.on('connection', (socket) => {
  
  console.log("Um dispositivo conectou");
  
  devices.newDeviceConnection(socket);
  
  socket.on('disconnect', () => devices.deleteDeviceConnection(socket));

  socket.on('consumption', msg => devices.registerConsumption(socket, msg));
  
});

exports.io = io;

http.listen(process.env.PORT || 3000);
