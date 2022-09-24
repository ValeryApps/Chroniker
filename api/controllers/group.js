const Group = require("../models/Group");
const User = require("../models/User");

exports.createGroup = async (req, res) => {
  const { groupName } = req.body;
  const userId = req.user.id;
  try {
    let user = await User.findById(userId);
    let group = await new Group({
      groupName,
      admin: userId,
    }).save();
    await group.updateOne({
      $push: { followers: userId },
    });
    await user.updateOne({
      $push: {
        following: group._id,
      },
    });
    return res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserGroups = async (req, res) => {
  const userId = req.user.id;
  try {
    const groups = await Group.find();
    const user_groups = groups.filter((x) => x.followers.includes(userId));
    return res.status(201).json(user_groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
