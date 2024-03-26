import {expect, jest, test} from '@jest/globals';
import db from "./db.js";

describe("Singleton Database Test", () => {
  test("Connection to MongoDB", () => {
    expect(db.readyState).toBe(1); // 1 means connected
  });

  test("Error Handling", () => {
    const errorCallback = jest.fn();
    db.on("error", errorCallback);
    db.emit("error", new Error("Test error"));

    expect(errorCallback).toHaveBeenCalled();
  });

  test("Open Event Handling", () => {
    const openCallback = jest.fn();
    db.on("open", openCallback);
    db.emit("open");

    expect(openCallback).toHaveBeenCalled();
  });
});

