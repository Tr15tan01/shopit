const { Query } = require('mongoose')
const Message = require('../../models/Message')

module.exports = {
    Mutation: {
        async createMessage(__, { messageInput: { text, username } }) {
            const newMessage = new Message({
                text: text,
                createdBy: username,
                createdAt: new Date().toISOString()
            })
            const res = await newMessage.save()
            console.log(res)
            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    Query: {
        message: (__, { ID }) => Message.findById(ID),
        tester: () => 'returned text test here',
        // messages: () => {
        //     return [{ text: "dummy message", createdAt: 'dummm', createdBy: 'dummt' }]
        // },
        messages: async () => {
            //I don't know why but this function didnot work without async 🤯
            const allMessages = await Message.find()
            console.log(allMessages)
            return allMessages
        }
    }
}