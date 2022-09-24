const React = require("../models/React");
const mongoose = require("mongoose");
const Post = require("../models/Post");

exports.react = async (req, res) => {
  const { react, postId } = req.body;
  const userId = req.user.id;
  try {
    const existingReact = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(userId),
    });

    const post = await Post.findById({ _id: postId.toString() });
    if (!existingReact) {
      const response = await new React({
        react,
        postRef: postId,
        reactBy: userId,
      }).save();
      await post.updateOne({
        $push: {
          reacts: response._id,
        },
      });
      return res.json(response);
    } else {
      if (existingReact?.react === react) {
        await React.findByIdAndRemove(existingReact._id);
        await post.updateOne({
          $pull: {
            reacts: existingReact?._id,
          },
        });
        console.log("react removed");
        return res.json({ message: "react removed" });
      } else {
        const response = await React.findByIdAndUpdate(
          existingReact._id,
          { react },
          { new: true }
        );
        return res.json(response);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getReacts = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const react = await React.findOne({ postRef: postId, reactBy: userId });
    const allReacts = await React.find({ postRef: postId });
    return res.json({ react, allReacts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
