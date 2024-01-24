const { model, Schema } = require('mongoose')

const User = new Schema({
    email: {
        require: true,
        type: String
    },

    passwordHash: {
        require: true,
        type: String
    },

    name: {
        require: false,
        type: String
    },

    contactPhone: {
        require: false,
        type: String
    }
})

User.statics.findByEmail = async(email) => {
    return userModel.findOne({ email: email })
}

const userModel = model('user', User)

module.exports = userModel
