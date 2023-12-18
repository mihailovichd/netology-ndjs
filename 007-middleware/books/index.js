const express = require('express')

const uploadRouter = require('./routes/upload')
const downloadRouter = require('./routes/download')


const app = express()

app.use('/api/books', uploadRouter)
app.use('/api/books', downloadRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT)