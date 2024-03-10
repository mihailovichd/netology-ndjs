import express from 'express';
const router = express.Router();

import 'reflect-metadata';

import BooksRepository from '../services';
import { container } from '../inversify.config';

const booksRepository = container.get(BooksRepository);

router.get('/', async (req, res) => {
    try {
        const list = await booksRepository.getBooks();
        res.render('books/index', {
            title: 'Книги',
            list: list,
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Загрузить книгу',
        book: {}
    });
});

router.post('/create', async (req, res) => {
    const { title, desc, authors, favorite, fileCover, fileName } = req.body;

    try {
        await booksRepository.createBook({
            title: title,
            description: desc,
        });
        res.redirect('/books');
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await booksRepository.deleteBook(id);
        res.redirect('/books');
    } catch (e) {
        res.json(e);
    }
});

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await booksRepository.getBook(id);
        res.render('books/create', {
            title: "Обновить запись",
            book: book
        });
    } catch (e) {
        res.json(e);
    }
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, desc, authors, favorite, fileCover, fileName } = req.body;

    try {
        await booksRepository.updateBook(id, { title, description: desc, authors, favorite, fileCover, fileName });
        res.redirect(`/books/${id}`);
    } catch (e) {
        res.json(e);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book =  await booksRepository.getBook(id);
        const { title } = book;

        res.render('books/view', {
            title: `Книга ${title}`,
            book: book,
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/chat/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await booksRepository.getBook(id)
        const { title } = book

        res.render('books/chat', {
            title: `Чат ${title}`,
            book: book,
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;