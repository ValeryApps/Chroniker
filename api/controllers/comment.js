const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.comment = async (req, res) => {
  const { comment, postId, image } = req.body;
  try {
    const com = await new Comment({
      comment,
      image,
      postRef: postId,
      commentBy: req.user.id,
    }).save();
    await com.populate("commentBy", "first_name last_name picture username");
    const post = await Post.findById(postId);
    await post.updateOne({
      $push: { comments: com._id },
    });
    return res.json(com);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postRef: postId })
      .sort({ commentAt: -1 })
      .populate("replies")
      .populate("commentBy", "first_name last_name picture username");
    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
