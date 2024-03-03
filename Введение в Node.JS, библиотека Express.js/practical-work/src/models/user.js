const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    email: {
        require: true,
        type: String,
        unique: true
    },

    passwordHash: {
        require: true,
        type: String
    },

    name: {
        require: true,
        type: String,
    },

    contactPhone: {
        require: false,
        type: String
    }
})

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email })
}

module.exports = model('user', userSchema)
