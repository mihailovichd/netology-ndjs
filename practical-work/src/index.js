const express = require('express')
const mongoose = require('mongoose')

const app = express()

const apiRoute = require('./routes/api/index')

app.use('/api/', apiRoute)

const start = async(port, dbUrl, dbName) => {
    await mongoose.connect(dbUrl, { dbName: dbName })
    app.listen(PORT, () => {
        console.log(`Server listens on port ${port}`)
    })
}

const PORT = process.env.PORT || 3000
const DBURL = process.env.DBURL
const DBNAME = process.env.DBNAME
start(PORT, DBURL, DBNAME)