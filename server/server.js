import router from "./controllers/post.js";
import express from "express";
import db from "./db.js";
import cors from "cors";

const port = process.env.SERVER_LOCAL_PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/posts", router);

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
