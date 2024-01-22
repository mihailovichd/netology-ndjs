const { model, Schema } = require('mongoose')

const User = new Schema({
    email: {
        require: true,
        type: String
    },

    password: {
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

const userModel = model('user', User)

User.methods.findByEmail = async(email) => {
    return userModel.findOne({ email: email }).select('-__v')
}

module.exports = userModel
