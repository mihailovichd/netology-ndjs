const express = require('express')

const bookRouter = require('./routes/books')
const indexRouter = require('./routes/index');

const app = express()
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter)
app.use('/books', bookRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT)