const express = require('express')
const { v4: uuid } = require('uuid')

const app = express()
app.use(express.json())

class Book {
    constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id= uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
    }
}

const BOOKS_STORAGE = []

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (req, res) => {
    res.json(BOOKS_STORAGE)
})

const findBookIdx = (id) => {
    return BOOKS_STORAGE.findIndex(el => el.id === id)
}

const handleBookNotFound = (res) => {
    res.status(404).json('not found')
}

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params
    const idx = findBookIdx(id)
    if (idx !== -1) {
        res.json(BOOKS_STORAGE[idx])
    } else {
        handleBookNotFound(res)
    }
})

app.post('/api/books/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const book = new Book(title, description, authors, favorite, fileCover, fileName)
    BOOKS_STORAGE.push(book)
    res.json(book)
})

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const idx = findBookIdx(id)
    if (idx !== -1) {
        BOOKS_STORAGE[idx] = {
            ...BOOKS_STORAGE[idx],
            title, description, authors, favorite, fileCover, fileName
        }
        res.json(BOOKS_STORAGE[idx])
    } else {
        handleBookNotFound(res)
    }
})

app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params
    const idx = findBookIdx(id)
    if (idx !== -1) {
        BOOKS_STORAGE.splice(idx, 1)
        res.json('ok')
    } else {
        handleBookNotFound(res)
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)