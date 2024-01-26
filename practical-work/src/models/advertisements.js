const { model, Schema, ObjectId } = require('mongoose')

const Advertisements = new Schema({
    shortText: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    images: {
        type: Array
    },

    userId: {
        type: ObjectId,
        required: true
    },

    createdAt: {
        type: Date,
        required: true
    },

    updatedAt: {
        type: Date,
        required: true
    },

    tags: {
        type: Array,
    },

    isDeleted: {
        type: Boolean,
        required: true
    }
})

Advertisements.statics.remove = async(id) => {
    return advertisementsModel.deleteOne({ _id: id })
}

Advertisements.statics.find = async(params) => {
    const { shortText, description, userId, tags } = params
    return advertisementsModel.findOne({
        shortText: shortText,
        description: description,
        userId: userId,
        tags: tags,
        isDeleted: false
    })
}

const advertisementsModel = model('advertisements', Advertisements)

module.exports = advertisementsModel