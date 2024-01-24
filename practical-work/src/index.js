const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const apiRoute = require('./routes/api/index')

const app = express()
app.use(express.json())
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRoute)

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