const http = require("http");
import express from "express";
import dotenv from "dotenv";
import { ApolloServer, PubSub } from "apollo-server-express";
import { typeDefs, Query, Mutation, Subscription } from "./graphql";
import { setupPassport, setupDatabase, setupRoutes } from "./setup";

dotenv.config();

const pubsub = new PubSub();

const mount = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const database = await setupDatabase();

  setupPassport(app, database);
  setupRoutes(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
    subscriptions: {
      path: "/subscriptions",
    },
    context: ({ req, res }) => ({
      req,
      res,
      database,
      pubsub,
    }),
    playground: { settings: { "request.credentials": "same-origin" } },
  });

  server.applyMiddleware({
    app,
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: process.env.PORT }, () => {
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
    );

    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  });
};

mount();
