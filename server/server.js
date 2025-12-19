// server/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoDbClient = new (require('./mongoDbClient'))();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json());
app.use('/', require('./gameController'));

require('./socketHandlers')(io);
mongoDbClient.init().then(() => {
    require('./changeStreams')(io);
    server.listen(3000, () => console.log('Server listening on *:3000'));
});
