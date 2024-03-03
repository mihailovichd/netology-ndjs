const express = require('express')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')

const usersRoute = require('./routes/users')

const app = express()
app.set('view engine', 'ejs')

app.use(express.urlencoded());
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', usersRoute)

const start = async(port, dbUrl) => {
    try {
        await mongoose.connect(dbUrl, { dbName: 'users' })
        app.listen(port, () => {
            console.log('success')
        })
    } catch (e) {
        console.log(e)
    }
}

const PORT = process.env.port || 3000
const dbUrl = process.env.dbUrl || 'mongodb://root:example@localhost:27017'
start(PORT, dbUrl)