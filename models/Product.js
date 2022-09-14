const { model, Schema } = require('mongoose')

const productSchema = new Schema({
    name: String,
    description: String,
    photo: String,
    category: String,
    createdAt: String
})

module.exports = model('Product', productSchema)