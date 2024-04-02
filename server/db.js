import mongoose from "mongoose";

class Database {
  constructor() {
    if (!Database.instance) {
      const { connect, connection } = mongoose;
      const mongoDB = process.env.DB_CONNECTION;

      connect(mongoDB);
      this.db = connection;

      this.db.on("error", console.error.bind(console, "connection error:"));
      this.db.once("open", () => {
        console.log("connected to mongodb");
      });

      Database.instance = this;
    }

    return Database.instance;
  }
}

export default Database;
