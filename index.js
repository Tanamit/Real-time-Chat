const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{
    
    // socket.on('set username', (username)=> {
    // })

    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    });

    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
        });
      });
});

server.listen(3050, () => {
    console.log('Server listening on port: 3050');
});