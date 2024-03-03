const express = require('express')
const router = express.Router()

const responseMiddleware = require("../../middleware/response");
const errorMiddleware = require('../../middleware/error')

const usersRoute = require('./user')
const advertisementsRoute = require('./advertisements')
const { router: chatRoute } = require('./chat')

router.use(responseMiddleware)
router.use('/', usersRoute)
router.use('/advertisements', advertisementsRoute)
router.use('/chat', chatRoute)
router.use(errorMiddleware)

module.exports = router