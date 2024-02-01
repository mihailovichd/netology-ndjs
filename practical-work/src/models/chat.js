const { model, Schema } = require('mongoose')
const Message = require('./message')

const chatSchema = new Schema({
    users: {
        type: Array,
        required: true
    },

    createdAt: {
        type: Date,
        required: true
    },

    messages: {
        type: Array,
    }
})

chatSchema.statics.findChat = function (users) {
    return this.findOne({ users: users })
}

chatSchema.statics.sendMessage = async function ({ author, receiver, text }) {
    try {
        const newMessage = await Message.create({ author, sentAt: Date.now(), text })

        const users = [author, receiver]
        const chat = await this.findChat(users)
        if (chat) {
            await this.findByIdAndUpdate(chat._id, { $push: { messages: newMessage._id } })
        } else {
            await this.create({ users, createdAt: Date.now(), messages: [newMessage._id] })
        }

        return newMessage
    } catch (e) {
        console.log(e)
    }
}

chatSchema.statics.getHistory = async function (id) {
    return this.findById(id)
}

chatSchema.statics.subscribe = function (cb) {
    
}

module.exports = model('chat', chatSchema)