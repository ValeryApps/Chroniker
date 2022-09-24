const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;
const reactSchema = new Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    require: true,
  },
  postRef: {
    type: ObjectId,
    ref: "Post",
  },
  reactBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = model("React", reactSchema);
