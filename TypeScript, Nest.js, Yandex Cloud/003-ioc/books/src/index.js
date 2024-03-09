const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')

const bookRouter = require('./routes/books')
const indexRouter = require('./routes');

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.urlencoded());
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    const { id } = socket
    console.log(`Socket connected: ${id}`)

    const { roomName} = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`)
    socket.join(roomName);
    socket.on('message-to-book', (msg) => {
        msg.type = `room: ${roomName}`;
        socket.to(roomName).emit('message-to-book', msg)
        socket.emit('message-to-book', msg)
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`)
    })
})

app.use('/', indexRouter)
app.use('/books', bookRouter)

const start = async(port, dbUrl) => {
    try {
        console.log(port, dbUrl)
        await mongoose.connect(dbUrl, { dbName: 'books' })
        server.listen(port, () => {
            console.log(`Server listens on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

const { PORT, DB_URL } = process.env
start(PORT || 3000, DB_URL || 'mongodb://localhost:27017/books')