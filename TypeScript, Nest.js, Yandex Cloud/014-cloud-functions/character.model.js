const { Schema, model } = require('mongoose')

const characterSchema = new Schema({
    id: Number,
    description: String,
    modified: Date,
    thumbnail: String,
    comics: [
        {
            id: Number,
            name: String,
        }
    ]
})
module.exports = model('character', characterSchema)