import Post from "../models/post.js";
import express from "express";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description, author } = req.query;

    if (!title || !description || !author) {
      return res.status(400).json({ error: "Please fill all provided fields" });
    }

    if (title.length > 50) {
      return res.status(400).json({
        error:
          "Title is too long (more than 50).\nBuy premium for more than 250 characters per post :)",
      });
    }

    if (description.length > 250) {
      return res.status(400).json({
        error:
          "Description is too long (more than 250).\nBuy premium for more than 250 characters per post :)",
      });
    }

    if (author.length > 50) {
      return res.status(400).json({
        error:
          "Auhtor name is too long (more than 50).\nBuy premium for more than 250 characters per post :)",
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
      return res.status(204).json({ error: "No posts yet" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post has been deleted" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Post not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postID = req.params.id;

    const deletePost = await Post.findByIdAndDelete(postID);

    if (!deletePost) {
      return res.status(404).json({ error: "Post has been deleted" });
    }

    res.status(200).json(deletePost);
  } catch (error) {
    res.status(500).json({ error: "Post not found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Post.findByIdAndUpdate(postID, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ error: "Post not found" });
  }
});

export default router;
