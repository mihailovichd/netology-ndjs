const { Schema, model} = require('mongoose')

const usersSchema = new Schema({
    username: {
        require: true,
        type: String
    },

    password: {
        require: true,
        type: String
    }
})

module.exports = model('users', usersSchema)