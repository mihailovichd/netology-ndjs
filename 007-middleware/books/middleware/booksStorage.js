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

module.exports = {
    init: (req, res) => {
        const { title, description, authors, favorite, fileCover, fileName } = req.body
        const fileBook = req.file.path
        const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
        booksStorage.push(book)
        res.json(book)
    },

    get: (id) => {
        const idx = booksStorage.findIndex(el => el.id === id)
        return booksStorage[idx]
    }
}