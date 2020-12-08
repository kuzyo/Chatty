const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const setupPassport = require("./setup/setupPassport");
const setupDatabase = require("./setup/setupDatabase");
const setupRoutes = require("./setup/setupRoutes");
require("dotenv").config();

const mount = async () => {
  const database = await setupDatabase();

  const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
    },
    context: (req, res) => ({ database, req, res }),
  });

  setupPassport(server, database);
  setupRoutes(server);

  server.start(
    {
      cors: {
        credentials: true,
        // origin: process.env.FRONTEND_URL,
      },
    },
    ({ port }) => {
      console.log(`Server is listening on port ${port}`);
    }
  );
};

mount();
