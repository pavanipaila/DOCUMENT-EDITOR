const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let content = "";

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('User connected');
    socket.emit('text-update', content);

    socket.on('text-update', (data) => {
        content = data;
        socket.broadcast.emit('text-update', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});