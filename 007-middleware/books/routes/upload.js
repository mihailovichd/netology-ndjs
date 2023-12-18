const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/files')
const initBook = require('../middleware/booksStorage')

router.post('/upload', fileMulter.single('file'), initBook.init)

module.exports = router