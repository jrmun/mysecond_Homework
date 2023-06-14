const express = require("express");
const router = express.Router();
const posts = require("../schemas/post.js");
const comment = require("../schemas/comment.js");

router.get("/posts/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  try {
    const commentList = await comment.find({ postId: postId });
    res.status(200).json({ delail: commentList });
  } catch (err) {
    console.error(err);
  }
});

router.post("/posts/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  let { cmtId, cmtName, cmtpassword, cmtSubstance } = req.body;
  cmtId = String(postId) + String(cmtId);
  const existscomment = await comment.find({ cmtId: Number(cmtId) });
  if (existscomment.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 commentId입니다." });
  }
  const createdcomment = await comment.create({
    cmtId,
    postId,
    cmtName,
    cmtpassword,
    cmtSubstance,
  });

  res.json({ posts: createdcomment });
});

router.put("/posts/:cmtId/comment/", async (req, res) => {
  const { cmtId } = req.params;
  const { cmtName, cmtSubstance } = req.body;
  const existscomment = await comment.find({ cmtId: Number(cmtId) });
  if (existscomment.length) {
    await comment.updateOne(
      { cmtId: Number(cmtId) },
      { $set: { cmtName, cmtSubstance } }
    );
  }

  res.json({ success: true });
});

router.delete("/posts/:cmtId/comment", async (req, res) => {
  const { cmtId } = req.params;
  const existscomment = await comment.find({ cmtId: Number(cmtId) });
  if (existscomment.length > 0) {
    await comment.deleteOne({ cmtId });
  }
  res.json({ result: "success" });
});

module.exports = router;
