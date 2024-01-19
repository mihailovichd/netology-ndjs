const redis = require('redis')
const express = require('express')

const app = express()

const client = redis.createClient({ url: 'redis://storage' });
(async() => {
    await client.connect()
})()

app.get('/counter/:id/incr', async(req, res) => {
    const { id } = req.params
    try {
        const cnt = await client.incr(id)
        res.json({cnt})
    } catch (e) {
        res.json({e})
    }
})

app.get('/counter/:id', async(req, res) => {
    const { id } = req.params
    try {
        const cnt = await client.get(id)
        res.json({cnt})
    } catch (e) {
        res.json({e})
    }
})

app.listen(3001, () => {
    console.log('Counter is listening 3001')
})