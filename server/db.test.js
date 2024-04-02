import mongoose from "mongoose";
import Database from "./db.js";

describe("Singleton Database", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should connect to the mongodb database only once", async () => {
    const SingletonDatabase = new Database();
    const newSingletonDatabase = new Database();

    await expect(newSingletonDatabase.instance).toBe(
      SingletonDatabase.instance
    );
  });

  it("should have an active mongodb connection", async () => {
    await expect(mongoose.connection.readyState).toBe(2 || 1);
  });
});
