const express = require("express");
const router = express.Router();
const posts = require("../schemas/post.js");

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const postList = await posts.find({ postId: postId });
    res.status(200).json({ delail: postList });
  } catch (err) {
    console.error(err);
  }
});

router.post("/posts", async (req, res) => {
  const { postId, postTitle, name, password, postContent } = req.body;
  const existsPost = await posts.find({ postId: Number(postId) });
  if (existsPost.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 postId입니다." });
  }
  const createdPost = await posts.create({
    postId,
    postTitle,
    name,
    password,
    postContent,
  });

  res.json({ posts: createdPost });
});

router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { postTitle, name, password, postContent } = req.body;
  const existsPosts = await posts.find({ postId: Number(postId) });
  if (existsPosts.length) {
    if (existsPosts[0].password === password) {
      await posts.updateOne(
        { postId: Number(postId) },
        { $set: { postTitle, name, postContent } }
      );
      res.json({ success: true });
    } else {
      res.json({ success: false, errorMessage: "비밀번호 오류" });
    }
  }
});

router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;
  const existsPosts = await posts.find({ postId: Number(postId) });
  if (existsPosts.length > 0) {
    if (existsPosts[0].password === password) {
      await posts.deleteOne({ postId });
      res.json({ result: "success" });
    }
  } else {
    res.json({ result: "false", errorMessage: "비밀번호 오류" });
  }
});

module.exports = router;
