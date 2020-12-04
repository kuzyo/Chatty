// import { GraphQLServer } from ;
// const Mutation = require('./resolvers/Mutation');
// const Query = require('./resolvers/Query');
// const db = require('./db');

// // Create the GraphQL Yoga Server

// function createServer() {
//   return new GraphQLServer({
//     typeDefs: 'src/schema.graphql',
//     resolvers: {
//       Mutation,
//       Query,
//     },
//     resolverValidationOptions: {
//       requireResolversForResolveType: false,
//     },
//     context: req => ({ ...req, db }),
//   });
// }

// module.exports = createServer;
const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "Man"}`,
  },
};

function createServer() {
  return new GraphQLServer({ typeDefs, resolvers });
}

module.exports = createServer;
