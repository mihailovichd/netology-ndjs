const mongoose = require('mongoose')
const express = require('express')
const serverless = require('serverless-http')

const app = express()
app.use(express.urlencoded({ extended: true }))

const apiRoute = require('./api')
app.use('/api', apiRoute)

app.get('/', (req, res) => {
    res.json({ msg: 'hello world' })
})

const start = async(port, dbUrl, dbName) => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsCAFile: process.cwd() + '/root.crt',
        })
        return serverless(app)
    } catch (e) {
        console.log(e)
    }
}

const handler = serverless(app);
module.exports.handler = async (event, context) => {
    await start(process.env.PORT || 3000, process.env.DB_URL, process.env.DB_NAME)
    const result = await handler(event, context);
    return result;
};