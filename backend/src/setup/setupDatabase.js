const { MongoClient } = require("mongodb");

const setupDatabase = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("chatty");

  return {
    users: db.collection("users"),
  };
};

module.exports = setupDatabase;
