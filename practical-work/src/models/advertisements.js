const { model, Schema, ObjectId } = require('mongoose')

const advertisementsSchema = new Schema({
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

advertisementsSchema.statics.removeById = function(id) {
    return this.findByIdAndUpdate(id, { isDeleted: true })
}

advertisementsSchema.statics.findByParams = function({ shortText, description, userId, tags }) {
    return this.find({
        [shortText ? 'shortText' : null]: { '$regex': shortText },
        [description ? 'description' : null]: { '$regex': description },
        [userId ? 'userId' : null]: userId,
        [tags ? 'tags': null]: tags,
        isDeleted: false
    })
}

module.exports = model('advertisements', advertisementsSchema)