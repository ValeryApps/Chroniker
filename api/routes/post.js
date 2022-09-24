const express = require("express");
const {
  createPost,
  getPosts,
  savePost,
  deletePost,
  getPostsForUnsubscribed,
  likePost,
  getPostsPerCategory,
} = require("../controllers/post");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/posts", auth, createPost);
router.get("/posts/all_posts", auth, getPosts);
router.get("/posts/forUnsubscribed", getPostsForUnsubscribed);
router.get("/posts/:category", getPostsPerCategory);
router.put("/savePost/:postId", auth, savePost);
router.delete("/deletePost/:postId", auth, deletePost);
router.put("/like/:postId", auth, likePost);

module.exports = router;
