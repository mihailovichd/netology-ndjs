const express = require('express')
const router = express.Router()

const responseMiddleware = require("../../middleware/response");

const authRoute = require('./auth')
const advertisementsRoute = require('./advertisements')

router.use(responseMiddleware)
router.use('/', authRoute)
router.use('/advertisements', advertisementsRoute)

module.exports = router