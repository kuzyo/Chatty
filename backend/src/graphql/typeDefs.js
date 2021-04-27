import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    name: String!
    email: String!
    googleId: String!
    image: String!
  }

  type Message {
    _id: ID!
    from: ID!
    to: ID!
    body: String!
    createdAt: Date!
  }

  type Query {
    currentUser: User
    getUsers: [User]!
    getMessages: [Message]!
  }

  type Mutation {
    logout: Boolean
    createMessage(to: ID!, body: String!): Message
  }

  type Subscription {
    messageSent: Message
  }
`;

export default typeDefs;
