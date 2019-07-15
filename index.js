const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
    socket.join(socket.handshake.query.roomId)

    socket.on('join room', roomId => {
        io.emit('player joined', roomId)
        socket.join(roomId)
    })

    socket.on('play', gameState => {
        socket.to(gameState.roomId).emit('play', gameState)
    })
})

http.listen(3000, () => {
    console.log('Express server lisetning on port 3000')
})
