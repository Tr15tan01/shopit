const Product = require('../../models/Product')

module.exports = {
    Mutation: {
        async createProduct(_, { productInput: { name, description, photo, category } }) {

            const newProduct = new Product({
                name: name,
                description: description,
                photo: photo,
                category: category,
                createdAt: new Date().toISOString()
            })

            const res = await newProduct.save()
            console.log(res)

            return {
                id: res.id,
                ...res._doc
            }
        }
    },

    Query: {
        products: async () => {
            const allProducts = await Product.find()
            return allProducts
        },
        categories: async () => {
            const categories = await Product.find().select('category')
            //Todo - not unique here
            const uniqueCategories = [...new Set(categories)]
            console.log(uniqueCategories)
            return uniqueCategories
        }
    }
}