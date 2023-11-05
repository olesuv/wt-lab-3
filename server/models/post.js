import { model, Schema } from "mongoose";

var postSchema = new Schema({
  title: { type: String, max: 50 },
  description: { type: String, max: 250 },
  author: String,
  uploadDate: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);

export default Post;
