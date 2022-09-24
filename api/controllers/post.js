const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.createPost = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return;
    }
    const post = await Post(req.body).save();
    await post.populate(
      "user",
      "first_name last_name picture cover username savePosts"
    );
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getPosts = async (req, res) => {
  const { id } = req.user;
  try {
    const tempFollowing = await User.findById(id).select("following");
    const following = tempFollowing?.following;
    const promises = following?.map((user) => {
      return Post.find({ user })
        .populate("comments", "comment")
        .populate(
          "user",
          "first_name last_name picture background cover username savePosts"
        )
        .sort({ createdAt: -1 })
        .limit(10);
    });
    const followingPosts = await (await Promise.all(promises)).flat();
    const userPosts = await Post.find({ user: id }).populate(
      "user",
      "first_name last_name picture background cover username savePosts"
    );
    followingPosts.push(...[...userPosts]);
    followingPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return res.json(followingPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.savePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const saved_post = await user?.savedPosts.find(
      (x) => x.post.toString() === postId
    );
    if (saved_post) {
      const result = await User.findByIdAndUpdate(userId, {
        $pull: {
          savedPosts: { _id: saved_post._id },
        },
      });
      return res.json({ result: "post removed", result });
    } else {
      const result = await User.findByIdAndUpdate(userId, {
        $push: {
          savedPosts: {
            post: postId,
            savedAt: new Date(),
          },
        },
      });
      return res.json({ result: "post added", result });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndRemove(postId);
    return res.json(deletedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getPostsForUnsubscribed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username first_name last_name picture")
      .limit(10);
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      await post.updateOne({
        $pull: { likes: userId },
      });
      return res.json({ message: "You have unliked this post" });
    } else {
      await post.updateOne({
        $push: {
          likes: userId,
        },
      });
      return res.json({ message: "You have liked this post" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getPostsPerCategory = async (req, res) => {
  // const { id } = req.user;
  const { category } = req.params;
  try {
    const posts = await Post.find({ category })
      .populate("comments", "comment")
      .populate(
        "user",
        "first_name last_name picture background cover username savePosts"
      )
      .sort({ createdAt: -1 })
      .limit(16);
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
