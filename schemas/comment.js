const mongoose = require("mongoose");

const commentSchemas = new mongoose.Schema({
  cmtId: {
    type: Number,
    required: true,
    unique: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  cmtName: {
    type: String,
    required: true,
  },
  cmtpassword: {
    type: Number,
    required: true,
  },
  cmtSubstance: {
    type: String,
  },
});

module.exports = mongoose.model("comment", commentSchemas);
