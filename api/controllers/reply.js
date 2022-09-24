const Reply = require("../models/Reply");
const Comment = require("../models/Comment");

exports.reply = async (req, res) => {
  const { reply, commentId, image } = req.body;
  try {
    const rep = await new Reply({
      reply,
      image,
      commentRef: commentId,
      repliedBy: req.user.id,
    }).save();
    await rep.populate("repliedBy", "first_name last_name picture username");
    const comment = await Comment.findById(commentId);
    await comment.updateOne({
      $push: { replies: rep._id },
    });
    return res.json(rep);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getReplies = async (req, res) => {
  const { commentId } = req.params;
  try {
    const replies = await Reply.find({ commentRef: commentId })
      .sort({ replyAt: -1 })
      .populate("repliedBy", "first_name last_name picture username");
    return res.json(replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
