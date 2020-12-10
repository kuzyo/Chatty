import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, Query, Mutation } from "./graphql";
import { setupPassport, setupDatabase, setupRoutes } from "./setup";

dotenv.config();

const mount = async () => {
  const app = express();
  const database = await setupDatabase();

  setupPassport(app, database);
  setupRoutes(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
    context: ({ req }) => ({
      getUser: () => req.user,
      logout: () => req.logout(),
    }),
    playground: { settings: { "request.credentials": "same-origin" } },
  });

  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  });
};

mount();
