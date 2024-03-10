import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import './db_connection';

import bookRouter from './routes/books';
import indexRouter from './routes';
import path from 'path';

const app = express();
const server = new http.Server(app);
const io = new Server(server);

app.use(express.urlencoded());
app.set('views', path.join(__dirname, '../src/views'))
app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    const { roomName} = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);
    socket.on('message-to-book', (msg) => {
        msg.type = `room: ${roomName}`;
        socket.to(roomName).emit('message-to-book', msg);
        socket.emit('message-to-book', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

app.use('/', indexRouter);
app.use('/books', bookRouter);

const PORT = process.env.PORT
server.listen(PORT || 3000, () => {
    console.log(`Server listens on port ${PORT}`);
});