const app = require("express")();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
    socket.join(socket.handshake.query.roomId);

    socket.on("join room", roomId => {
        io.emit("player joined", roomId);
        socket.join(roomId);
    });

    socket.on("play", gameState => {
        socket.to(gameState.roomId).emit("play", gameState);
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log("Express server lisetning on port 3000");
});
