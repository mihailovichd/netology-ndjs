const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/files')
const booksStorage = require('../booksStorage')
const path = require('path')

router.get('/:id/download', (req, res) => {
    const { id } = req.params
    const { fileBook, fileName } = booksStorage.get(id)
    res.download(path.join(__dirname, '../', fileBook), fileName)
})

router.post('/upload', fileMulter.single('file'), booksStorage.init)

module.exports = router