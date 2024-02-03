const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const apiRoute = require('./routes/api/index')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

io.on('connection', (socket) => {
    const { id } = socket
    console.log(`Socket connected: ${id}`)

    const { chat } = socket.handshake.query;
    socket.join(chat);

    socket.on('sendMessage', (msg) => {})
    socket.on('getHistory', (id) => {})

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`)
    })
})

app.use(express.json())
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRoute)

const start = async(port, dbUrl, dbName) => {
    try {
        await mongoose.connect(dbUrl, { dbName: dbName })
        server.listen(PORT, () => {
            console.log(`Server listens on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

const { PORT, DB_URL, DB_NAME } = process.env
start(PORT | 3000, DB_URL, DB_NAME)