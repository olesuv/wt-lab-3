import router from "./controllers/post.js";
import express from "express";
import db from "./db.js";

const port = process.env.SERVER_LOCAL_PORT;

const app = express();

app.use(express.json());

app.use("/api/posts", router);

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
