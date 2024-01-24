const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')

const userModel = require('../../models/user')

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser( async (id, cb) => {
    try {
        const user = await userModel.findById(id)
        cb(null, user)
    } catch (e) {
        console.log(e)
    }
})

const hashString = (string) => crypto.createHash('sha256', string).digest('hex')

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, cb) => {
    try {
        const user = await userModel.findOne({ email: email }).select('-__v')

        if (!user) return cb(null, false)
        if (hashString(password) !== user.passwordHash) return cb(null, false)

        return cb(null, user)
    } catch (e) {
        console.log(e)
    }
}))

router.post('/signup',
    async(req, res, next) => {
        const { email } = req.body
        try {
            if (await userModel.findByEmail(email)) {
                return res.json({ status: false, msg: 'email занят' })
            }
            next()
        } catch (e) {
            console.log(e)
        }
    },

    async(req, res) => {
        const { email, password, name, contactPhone } = req.body
        const user = await userModel.create({
            email: email,
            passwordHash: hashString(password),
            name: name,
            contactPhone: contactPhone
        })
        res.json(user)
    }
)

router.post('/signin',
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user)
    }
)

module.exports = router