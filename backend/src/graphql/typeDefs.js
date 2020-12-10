import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    googleId: String!
    image: String
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    logout: Boolean
  }
`;

export default typeDefs;
