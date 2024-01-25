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
        cb(e)
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

router.post('/signup', async(req, res, next) => {
    const { email, password, name, contactPhone } = req.body
    try {
        res.result = await userModel.create({
            email: email,
            passwordHash: hashString(password),
            name: name,
            contactPhone: contactPhone
        })
        res.status(200)
    } catch (e) {
        res.result = e.code === 11000 ? 'email is busy' : e.message
        res.status(500)
    }
    next()
})

router.post('/signin',
    passport.authenticate('local'),
    (req, res, next) => {
        res.result = req.user
        res.status(200)
        next()
    }
)

module.exports = router