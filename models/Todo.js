const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
    text: String
})

module.exports = model('Todo', todoSchema)