import mongoose from "mongoose";
import Database from "./db.js";
import jest from "jest";

describe("Singleton Database", () => {
  // Mocking the mongoose connect function
  jest.spyOn(mongoose, "connect").mockImplementation(() => {});

  // Mocking console functions
  console.error = jest.fn();
  console.log = jest.fn();

  beforeEach(() => {
    // Clear mocks and reset singleton instance
    jest.clearAllMocks();
    Database.instance = null;
  });

  it("should create only one instance of the database", () => {
    const instance1 = new Database();
    const instance2 = new Database();

    expect(instance1).toBe(instance2);
  });

  it("should connect to the database", () => {
    const instance = new Database();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should log connection success message once", () => {
    const instance = new Database();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Connected to MongoDB");
  });

  it("should log connection error message on error", () => {
    // Simulate database connection error
    const error = new Error("Connection Error");
    jest.spyOn(mongoose.connection, "on").mockImplementation((event, callback) => {
      if (event === "error") {
        callback(error);
      }
    });

    const instance = new Database();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith("connection error:", error);
  });
});

