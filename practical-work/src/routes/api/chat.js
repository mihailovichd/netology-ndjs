const express = require('express')
const router = express.Router()

const Chat = require('../../models/chat')
const authMiddleware = require('../../middleware/user')

const socket = require('../../index')

router.use(authMiddleware)
router.use(socket)

router.post('/send',  async(req, res) => {
        const { receiver, text } = req.body
        res.data(res.codes.success, await Chat.sendMessage({ author: req.user.id, receiver, text }))
    }
)

module.exports = router