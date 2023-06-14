const mongoose = require("mongoose");

const postsSchemas = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("posts", postsSchemas);
