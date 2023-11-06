import mongoose from "mongoose";
const { model, Schema, maxLength } = mongoose;

var postSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 250 },
  author: { type: String, required: true, maxLength: 50 },
  uploadDate: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);

export default Post;
