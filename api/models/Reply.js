const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const replySchema = new Schema({
  reply: {
    type: String,
  },
  commentRef: {
    type: ObjectId,
    ref: "Comment",
    required: true,
  },
  image: {
    type: String,
  },
  repliedBy: {
    type: ObjectId,
    ref: "User",
  },
  replyAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Reply", replySchema);
