const { Schema, model } = require('mongoose')

const booksSchema = new Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    authors: {
        type: String,
    },

    favorite: {
        type: String,
    },

    fileCover: {
        type: String,
    },

    fileName: {
        type: String,
    },
})

module.exports = model('books', booksSchema)