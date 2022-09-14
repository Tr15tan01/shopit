const { gql } = require('apollo-server')

module.exports = gql`

type Message {
    text: String
    createdAt: String
    createdBy: String
}

type User {
    username: String
    email: String
    password: String
    token: String
}

input MessageInput {
    text: String
    username: String
}

input RegisterInput {
    username: String
    email: String
    password: String
    confirmpassword: String
}

input LoginInput {
    email: String
    password: String
}

input ProductInput {
    name: String
    description: String
    photo: String
    category: String
}

type Product {
    id: ID!
    name: String
    description: String
    photo: String
    category: String
    createdAt: String
}

type Category {
    category: String
}

type Todo {
    text: String
}

input TodoInput {
    text: String
}

type Query {
    message(id: ID!): Message
    user(id: ID!): User
    tester: String
    messages: [Message]
    users: [User]
    products:[Product]
    categories:[Category]
    todos: [Todo]
}

type Mutation {
    createMessage(messageInput: MessageInput) : Message!
    registerUser(registerInput: RegisterInput) :User!
    loginUser(loginInput: LoginInput):User!
    createProduct(productInput: ProductInput) : Product!
    addTodo(todoInput: TodoInput) : Todo!
}
`