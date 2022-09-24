const Post = require("../models/Post");

exports.likePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post does not exist" });
    }
  } catch (error) {}
};
