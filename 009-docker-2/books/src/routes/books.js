const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const {get} = require("http");

class Book {
    constructor(title = '', desc = '', id= uuid()) {
        this.id = id
        this.title = title
        this.desc = desc
    }
}

const booksStorage = []

router.get('/', (req, res) => {
    res.render('books/index', {
        title: 'Книги',
        list: booksStorage,
    });
})

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Загрузить книгу',
        book: {}
    })
})

router.post('/create', (req, res) => {
    const { title, desc } = req.body
    const book = new Book(title, desc)
    booksStorage.push(book)
    res.redirect('/books')
})

router.post('/delete/:id', (req, res) => {
    const { id } = req.params
    const idx = booksStorage.findIndex(el => el.id === id)
    booksStorage.splice(idx, 1)
    res.redirect('/books')
})

router.get('/update/:id', (req, res) => {
    const { id } = req.params
    const idx = booksStorage.findIndex(el => el.id === id)
    res.render('books/create', {
        title: "Обновить запись",
        book: booksStorage[idx]
    })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params
    const { title, desc } = req.body

    const idx = booksStorage.findIndex(el => el.id === id)
    booksStorage[idx] = {
        ...booksStorage[idx],
        title,
        desc,
    }

    res.redirect(`/books/${id}`)
})

const incrViews = (id, idx) => {
    get(`http://counter:3001/counter/${id}/incr`, (res) => {
        let data = ''
        res.on('data', (chunk) => data += chunk)
        res.on('end', () => {
            const parseData = JSON.parse(data)
            const { cnt } = parseData
            booksStorage[idx].views = cnt
        })
    })
}

router.get('/:id', (req, res) => {
    const { id } = req.params

    const idx = booksStorage.findIndex(el => el.id === id)
    const book = booksStorage[idx]
    const { title } = book

    incrViews(id, idx)

    res.render('books/view', {
        title: `Книга ${title}`,
        book: book,
    })
})

module.exports = router