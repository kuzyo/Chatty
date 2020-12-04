const mongoose = require("mongoose");

function connectDb() {
  return mongoose.connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDb;
