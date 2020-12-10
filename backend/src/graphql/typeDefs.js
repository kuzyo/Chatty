import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID
    googleId: String
    name: String
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
