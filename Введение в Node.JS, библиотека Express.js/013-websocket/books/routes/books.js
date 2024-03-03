const express = require('express')
const router = express.Router()

const booksModel = require('../models/books')

router.get('/', async (req, res) => {
    try {
        const list = await booksModel.find().select('-__v')
        res.render('books/index', {
            title: 'Книги',
            list: list,
        });
    } catch (e) {
        res.json(e)
    }
})

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Загрузить книгу',
        book: {}
    })
})

router.post('/create', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new booksModel({
        title: title,
        description: description,
    })

    try {
        await newBook.save()
        res.redirect('/books')
    } catch (e) {
        console.log(e)
        res.json(e)
    }
})

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        await booksModel.deleteOne({ _id: id })
        res.redirect('/books')
    } catch (e) {
        res.json(e)
    }
})

router.get('/update/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await booksModel.findById(id).select('-__v')
        res.render('books/create', {
            title: "Обновить запись",
            book: book
        })
    } catch (e) {
        res.json(e)
    }
})

router.post('/update/:id', async (req, res) => {
    const { id } = req.params
    const { title, desc, authors, favorite, fileCover, fileName } = req.body

    try {
        await booksModel.findByIdAndUpdate(id, { title, description: desc, authors, favorite, fileCover, fileName })
        res.redirect(`/books/${id}`)
    } catch (e) {
        res.json(e)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await booksModel.findById(id).select('-__v')
        const { title } = book

        res.render('books/view', {
            title: `Книга ${title}`,
            book: book,
        })
    } catch (e) {
        res.json(e)
    }
})

router.get('/chat/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await booksModel.findById(id).select('-__v')
        const { title } = book

        res.render('books/chat', {
            title: `Чат ${title}`,
            book: book,
        })
    } catch (e) {
        res.json(e)
    }
})

module.exports = router