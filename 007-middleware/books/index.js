const express = require('express')

const bookRouter = require('./routes/books')

const app = express()

app.use('/api/books', bookRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT)