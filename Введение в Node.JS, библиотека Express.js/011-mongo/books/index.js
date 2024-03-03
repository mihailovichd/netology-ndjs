const express = require('express')
const app = express()

const mongoose = require('mongoose')

const booksRouter = require('./routes/api/books')

app.use('/api/books', booksRouter)

const start = async(port, dbUrl) => {
    try {
        console.log(dbUrl)
        await mongoose.connect(dbUrl, { dbName: 'books' })
        app.listen(port, () => {
            console.log('success')
        })
    } catch (e) {
        console.log(e)
    }
}

const PORT = process.env.port || 3000
const DBURL = process.env.dbUrl || 'mongodb://localhost:27017/books'
start(PORT, DBURL)