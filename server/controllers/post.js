import Post from "../models/post.js";
import express from "express";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { title, description, author } = req.body;

  try {
    const newPost = await Post.create({ title, description, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
