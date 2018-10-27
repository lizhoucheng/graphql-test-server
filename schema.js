const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolver')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type Query {
    message: String
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })