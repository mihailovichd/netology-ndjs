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

app.use((req, res) => {
    const isSuccess = res.statusCode === 200
    const result = {
        status: isSuccess ? 'ok' : 'false',
    }
    result[isSuccess ? 'data' : 'error'] = res.result
    res.json(result)
})

const start = async(port, dbUrl, dbName) => {
    try {
        await mongoose.connect(dbUrl, { dbName: dbName })
        app.listen(PORT, () => {
            console.log(`Server listens on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

const PORT = process.env.PORT || 3000
const DBURL = process.env.DBURL
const DBNAME = process.env.DBNAME
start(PORT, DBURL, DBNAME)