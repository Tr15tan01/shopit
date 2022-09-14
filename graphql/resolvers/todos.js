const Todo = require('../../models/Todo')

module.exports = {
    Mutation: {
        async addTodo(_, { todoInput: { text } }) {
            const newTodo = new Todo({
                text: text
            })

            const res = await newTodo.save()
            console.log(res)
            return {
                id: res.id,
                ...res._doc
            }
        }
    }
}