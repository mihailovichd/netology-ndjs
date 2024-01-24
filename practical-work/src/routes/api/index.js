const express = require('express')
const router = express.Router()

// const advertisementsRoute = require('./advertisements')
// const chatRoute = require('./chat')
const authRoute = require('./auth')

// router.use('/advertisements', advertisementsRoute)
router.use('/', authRoute)

// Socket.IO router.use('chat', chatRoute)

module.exports = router