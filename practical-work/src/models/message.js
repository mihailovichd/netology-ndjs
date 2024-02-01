const { model, Schema, ObjectId } = require('mongoose')

const messageSchema = new Schema({
    author: {
        type: ObjectId,
        required: true
    },

    sentAt: {
        type: Date,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    readAt: {
        type: Date
    }
})

module.exports = model('message', messageSchema)