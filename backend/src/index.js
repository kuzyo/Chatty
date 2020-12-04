const createServer = require("./createServer");
const connectDb = require("./connectDb");
require("dotenv").config();

const server = createServer();

connectDb().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
