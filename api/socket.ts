import app from './app'
import http from 'http'
import Socket from './controllers/socket/socket'

const server = http.createServer(app)
const io = Socket.createInstance(server)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('getMessage', (data) => {
    console.log(data);
    socket.emit('sendMessage', 'Hello from server');
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = {
  path: '/socket',
  handler: server,
}