const express = require('express')
const router = express.Router()
const booksStorage = require('../middleware/booksStorage')
const path = require('path')

router.get('/:id/download', (req, res) => {
    const { id } = req.params
    const { fileBook, fileName } = booksStorage.get(id)
    res.download(path.join(__dirname, '../', fileBook), fileName)
})

module.exports = router