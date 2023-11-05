import { ObjectId } from "mongodb";
import Post from "../models/post.js";
import express from "express";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description, author } = req.query;

    if (!title || !description || !author) {
      return res
        .status(400)
        .json({ error: "Title, description, and author are required." });
    }

    if (title.length > 50) {
      return res.status(400).json({
        error:
          "Title is too long (more than 50).\nBuy premium for more than 250 characters per post",
      });
    }

    if (description.length > 250) {
      return res.status(400).json({
        error:
          "Description is too long (more than 250).\nBuy premium for more than 250 characters per post",
      });
    }

    if (author.length > 50) {
      return res.status(400).json({
        error:
          "Auhtor name is too long (more than 50).\nBuy premium for more than 250 characters per post",
      });
    }

    const newPost = await Post.create({ title, description, author });

    res.status(200).json(newPost);
  } catch (error) {
    if (error) res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    if (posts === null) {
      return res.status(204).json({ error: "No posts yet." });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: Not working.
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(204).json({ error: "No post found." });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const postID = req.query.postID;

    if (!postID) {
      return res.status(400).json({
        error: "Empty post ID.",
      });
    }

    const deletePost = await Post.findByIdAndDelete(postID);

    if (!deletePost) {
      return res.status(400).json({
        error: "Post not found.",
      });
    }

    res.status(200).json(deletePost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: Not working.
router.put("/:id", async (req, res) => {
  try {
    const updatePost = await YourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
