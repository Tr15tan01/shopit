require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const express = require('express')
const path = require('path')

const uri = process.env.MONGO_URI
const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// server.start();

const app = express()
// app.use(express.static(path.join(__dirname, 'public')))
// server.applyMiddleware({ app })

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'))
// })

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('🧑‍🤝‍🧑  mongo connected')
        return server.listen({ port: port })
    })
    .then((res) => {

        console.log(`🚀  Server ready at ${res.url}`)
    })