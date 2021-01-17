const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')
const mongose = require('mongoose')

const { MONGODB } = require('./config.js')

const Post = require('./models/Post')


const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
} 

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000})
    })
    .then(res => [
        console.log(`Server Running At ${res.url}`)
    ])


    