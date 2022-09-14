// const { Query } = require('mongoose')
const User = require('../../models/User')
const { ApolloError } = require('apollo-server-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        async registerUser(__, { registerInput: { username, email, password } }) {

            //check if user exists
            const oldUser = await User.findOne({ email })

            //throw error if yes
            if (oldUser) {
                throw new ApolloError('A user exists with email' + email, 'USER_EXISTS')
            }

            //else encrypt password
            const encryptedPassword = await bcrypt.hash(password, 10)

            //build new user schema
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            // add jwt
            const token = jwt.sign({
                user_id: newUser._id, email
            }, 'temporary_pass', {
                expiresIn: '2h'
            })

            //add token to user
            newUser.token = token

            //save user id db
            const res = await newUser.save()

            return {
                id: res._id,
                ...res._doc
            }
        },

        async loginUser(__, { loginInput: { email, password } }) {
            //find if user exists
            const user = await User.findOne({ email })
            //check if passwords match
            if (user && (await bcrypt.compare(password, user.password))) {
                // add jwt
                const token = jwt.sign({
                    user_id: user._id, email
                }, 'temporary_pass', {
                    expiresIn: '2h'
                })
                user.token = token

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect Password', 'INC_PASS')
            }
        }
    },
    Query: {
        user: (__, { ID }) => User.findById(ID),
        users: async () => {
            const users = await User.find()
            return users
        }
    }
}