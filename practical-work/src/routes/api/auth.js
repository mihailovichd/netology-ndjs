const express = require('express')
const router = express.Router()

const userModel = require('../../models/user')

router.post('/signup',
    async(req, res, next) => {
        console.log(req)
        // const { email } = req.body
        //
        // if (await userModel.findByEmail(email)) {
        //     res.json({ status: false, msg: 'email занят' })
        // }
        next()
    },

    async(req, res) => {
        console.log(req.body)
        res.json('test')
    }
)

module.exports = router