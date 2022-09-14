const messagesResolvers = require('./messages')
const usersResolvers = require('./users')
const productResolvers = require('./products')
const todoResolvers = require('./todos')

module.exports = {
    Query: {
        ...messagesResolvers.Query,
        ...usersResolvers.Query,
        ...productResolvers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...productResolvers.Mutation,
        ...todoResolvers.Mutation
    }
}