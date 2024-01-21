const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const verify = async(username, password, cb) => {
    try {
        const user = await userModel.findOne({ username: username }).select('-__v')

        if (!user) {
            return cb(null, false)
        }

        if (password !== user.password) {
            return cb(null, false)
        }

        return cb(null, user)
    } catch (e) {
        console.log(e)
    }
}

const options = {
    usernameField: 'username',
    passwordField: 'password'
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser(async(_id, cb) => {
    try {
        const user = await userModel.findById(_id)
        cb(null, user)
    } catch (e) {
        console.log(e)
    }
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/api/user/login' }),
    (req, res) => {
        res.redirect('/api/user/me')
    }
)

router.get('/me',
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/api/user/login')
        }
        next()
    },
    (req, res) => {
        res.render('profile', {
            user: req.user
    })
})

router.post('/signup', async(req, res) => {
    const { username, password } = req.body
    try {
        const newUser = new userModel({
            username: username,
            password: password,
        })

        await newUser.save()
        res.json('success')
    } catch (e) {
        res.json(e)
    }
})

module.exports = router