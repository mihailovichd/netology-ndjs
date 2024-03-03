const express = require('express')
const router = express.Router()

const Chat = require('../../models/chat')
const authMiddleware = require('../../middleware/user')

const chatModel = require("../../models/chat");

router.post('/send',  async(req, res) => {
        const { receiver, text } = req.body
        res.data(res.codes.success, await Chat.sendMessage({ author: req.user.id, receiver, text }))
    }
)

module.exports = {
    router: router,
    socket: (io) => (req, res, next) => {
        io.on('connection', (socket) => {
            const { id } = socket
            console.log(`Socket connected: ${id}`)

            const { chat } = socket.handshake.query;
            socket.join(chat)

            const onMessage = (message) => {
                socket.to(chat).emit('newMessage', message)
                socket.emit('newMessage', message)
            }

            const idx = chatModel.subscribe(onMessage)

            if (!req.user) return
            const author = req.user.id;

            socket.on('sendMessage', async (data) => {
                const { receiver, text } = data
                await chatModel.sendMessage({ author, receiver, text })
            })

            socket.on('getHistory', async (receiver) => {
                socket.emit('chatHistory', await chatModel.findChat(author, receiver))
            })

            socket.on('disconnect', () => {
                chatModel.unSubscribe(idx)
                console.log(`Socket disconnected: ${id}`)
            })
        })
        next()
    }
}