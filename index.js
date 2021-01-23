const { ApolloServer, PubSub } = require('apollo-server')
const mongose = require('mongoose')


//config variables
const { MONGODB } = require('./config.js')

//mongoose schemas
const Post = require('./models/Post')

//grahql 
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
})

mongose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000 })
    })
    .then(res => [
        console.log(`Server Running At ${res.url}`)
    ])


