const { model, Schema, ObjectId } = require('mongoose')

const Advertisements = new Schema({
    shortText: {
        type: String,
        require: true
    },

    description: {
        type: String,
    },

    images: {
        type: Array
    },

    userId: {
        type: ObjectId,
        require: true
    },

    createdAt: {
        type: Date,
        require: true
    },

    updatedAt: {
        type: Date,
        require: true
    },

    tags: {
        type: Array,
    },

    isDeleted: {
        type: Boolean,
        require: true
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