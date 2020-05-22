const server = require('./index');

//  ESTRUTURAS DE DADOS

let devices = {}
let deviceIP = []
let deviceID = []

let consumption = 0;

getDevices = () => devices;

getDeviceIP = id => deviceIP[deviceID.indexOf(`${id}`)];

getDeviceID = ip => deviceID[deviceIP.indexOf(`${ip}`)];

const refreshDevices = () => {
  deviceIP = Object.keys(devices);
  deviceID = Object.values(devices);
}


// ROTAS DA CONEXÃO 

exports.newDeviceConnection = socket => {
  const address = socket.client.conn.remoteAddress;
  devices[`${address.substring(address.indexOf("ffff:") + 5)}`] = socket.id;
  refreshDevices();
}

exports.deleteDeviceConnection = socket => {
  delete devices[`${getDeviceIP(socket.id)}`];
  refreshDevices();
}


// ROTAS DO DISPOSITIVO 

exports.registerConsumption = async (socket, msg) => {
  consumption = msg;
}

// Rotas do sistema

exports.sendRequestToDevice = ip => {

  if (!devices[`${ip}`]) return 0;

  server.io.to(`${getDeviceID(ip)}`).emit('getConsumption', `me da o consumo`);

  return 1;

}


//  ROTAS DO USUARIO 

exports.getConsumption = async (req, res) => {

  const sent = this.sendRequestToDevice([ req.query.ip ]);

  if (!sent) return res.status(500).json({ message: 'Device not connected' });
  
  setTimeout(function() {
    return res.status(200).json({ message: `O consumo é: ${consumption}` });
  }, 100);

}


