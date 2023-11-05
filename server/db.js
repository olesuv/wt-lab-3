import mongoose from "mongoose";
const { connect, connection } = mongoose;

const mongoDB = process.env.DB_CONNECTION;

connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;
