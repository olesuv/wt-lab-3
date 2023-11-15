import mongoose from "mongoose";
const { model, Schema, maxLength } = mongoose;

var postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
    default: "Default title",
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
    default: "My minds...",
  },
  author: { type: String, required: true, maxLength: 50, default: "John Doe" },
  uploadDate: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);

export default Post;
