const express = require('express')
const router = express.Router()

const responseMiddleware = require("../../middleware/response");

const usersRoute = require('./user')
const advertisementsRoute = require('./advertisements')
const chatRoute = require('./chat')

router.use(responseMiddleware)
router.use('/', usersRoute)
router.use('/advertisements', advertisementsRoute)
router.use('/chat', chatRoute)

module.exports = router