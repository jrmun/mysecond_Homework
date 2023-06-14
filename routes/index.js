const express = require("express");
const router = express.Router();
const posts = require("../schemas/post.js");

router.get("/posts", async (req, res) => {
  try {
    const postList = await posts.find({});
    res.status(200).json({ posts: postList });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
