const express = require('express')
const router = express.Router()

const booksModel = require('../../models/books')

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await booksModel.findById(id).select('-__v')
        res.json(result)
    } catch (e) {
        res.json(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await booksModel.find().select('-__v')
        res.json(result)
    } catch (e) {
        res.json(e)
    }
})

router.post('/', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new booksModel({
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileName: fileName,
    })

    try {
        await newBook.save()
        res.json(newBook)
    } catch (e) {
        res.json(e)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    try {
        await booksModel.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName })
        res.redirect(`/api/books/${id}`)
    } catch (e) {
        res.json(e)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await booksModel.deleteOne({ _id: id })
        res.json(true)
    } catch (e) {
        res.json(e)
    }
})

module.exports = router