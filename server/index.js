const http = require('http');

const server = http.createServer();

const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('Se ha conectado un cliente');

    socket.broadcast.emit('chat_message', {
        usuario: 'INFO',
        mensaje: 'Se ha conectado un nuevo usuario'
    });

    socket.on('chat_message', (data) => {
        io.emit('chat_message', data);
    });

    // Receive a bus update(which comes from the same frontend client) for testing purposes, in the end this simulates the moment the server sends the bus position
    socket.on('busPositionUpdate', (data) => {
        let positionX = -122.493782;
        let positionY = 37.833683;
        data = {
            busPositions: [[positionX, positionY], [positionX+10, positionY]],
        };
        io.emit('busPositionUpdate', data);
        console.log('Bus position update received: ', data);
    });
});

server.listen(3000);