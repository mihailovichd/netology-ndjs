const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/files')
const path = require('path')
const { v4: uuid } = require('uuid')

class Book {
    constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', fileBook = '', id= uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
    }
}

const booksStorage = []

router.get('/:id/download', (req, res) => {
    const { id } = req.params
    const idx = booksStorage.findIndex(el => el.id === id)
    const { fileBook, fileName } = booksStorage[idx]
    res.download(path.join(__dirname, '../', fileBook), fileName)
})

router.post('/upload', fileMulter.single('file'), (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const fileBook = req.file.path
    const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    booksStorage.push(book)
    res.json(book)
})

module.exports = router