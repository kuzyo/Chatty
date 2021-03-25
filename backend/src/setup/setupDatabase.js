import { MongoClient } from "mongodb";

const setupDatabase = async () => {
  try {
    const client = await MongoClient.connect(process.env.DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("chatty");

    return {
      users: db.collection("users"),
      messages: db.collection("messages"),
    };
  } catch (error) {
    throw new Error(`👽 Error connecting to database: ${error}`);
  }
};

export default setupDatabase;
