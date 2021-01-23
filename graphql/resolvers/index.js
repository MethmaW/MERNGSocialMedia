const postResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {

    //Modifier
    Post: {
        likeCount: (parent) => {
            // console.log(parent)
            return parent.likes.length
        },
        commentCount: (parent) => {
            console.log(parent)
            return parent.comments.length
        }
    },

    //Query
    Query: {
        ...postResolvers.Query
    },

    //Mutation
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    },

    //Subscription
    Subscription: {
        ...postResolvers.Subscription
    }
}