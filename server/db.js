import mongoose from "mongoose";

class Database {
  constructor() {
    if (!Database.instance) {
      const { connect, connection } = mongoose;
      const mongoDB = process.env.DB_CONNECTION;

      connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.db = connection;

      this.db.on("error", console.error.bind(console, "connection error:"));
      this.db.once("open", () => {
        console.log("Connected to MongoDB");
      });

      Database.instance = this;
    }

    return Database.instance;
  }
}

const singletonDatabase = new Database();

export default singletonDatabase.db;

