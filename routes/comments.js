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
  } else {
    if (cmtSubstance.length !== 0) {
      const createdcomment = await comment.create({
        cmtId,
        postId,
        cmtName,
        cmtpassword,
        cmtSubstance,
      });
      res.json({ posts: createdcomment });
    } else {
      return res
        .status(400)
        .json({ success: false, errorMessage: "내용을 입력해주세요." });
    }
  }
});

router.put("/posts/:cmtId/comment/", async (req, res) => {
  const { cmtId } = req.params;
  const { cmtSubstance, password } = req.body;
  const existscomment = await comment.find({ cmtId: Number(cmtId) });
  if (existscomment.length) {
    if (existscomment[0].cmtpassword === password) {
      if (cmtSubstance.length !== 0) {
        await comment.updateOne(
          { cmtId: Number(cmtId) },
          { $set: { cmtSubstance } }
        );
        res.json({ success: true });
      } else {
        res.json({ success: false, errorMessage: "내용을 입력해주세요." });
      }
    } else {
      res.json({ success: false, errorMessage: "비밀번호 오류" });
    }
  }
});

router.delete("/posts/:cmtId/comment", async (req, res) => {
  const { cmtId } = req.params;
  const { password } = req.body;
  const existscomment = await comment.find({ cmtId: Number(cmtId) });
  if (existscomment.length > 0) {
    if (existscomment[0].cmtpassword === password) {
      await comment.deleteOne({ cmtId });
      res.json({ result: "success" });
    } else {
      res.json({ result: "false", errorMessage: "비밀번호 오류" });
    }
  }
});

module.exports = router;
