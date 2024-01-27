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

Advertisements.statics.removeById = async(id) => {
    console.log(id)
    return advertisementsModel.findByIdAndUpdate(id,{ isDeleted: true })
}

Advertisements.statics.findByParams = async(params) => {
    const { shortText, description, userId, tags } = params
    return advertisementsModel.find({
        [shortText ? 'shortText' : null]: { '$regex': shortText },
        [description ? 'description' : null]: { '$regex': description },
        [userId ? 'userId' : null]: userId,
        [tags ? 'tags': null]: tags,
        isDeleted: false
    })
}

const advertisementsModel = model('advertisements', Advertisements)

module.exports = advertisementsModel