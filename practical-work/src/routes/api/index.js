const express = require('express')
const router = express.Router()

const advertisementsRoute = require('./advertisements')
const authRoute = require('./auth')

router.use('/advertisements', advertisementsRoute)
router.use('/', authRoute)

module.exports = router