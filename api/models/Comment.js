const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
  },
  postRef: {
    type: ObjectId,
    ref: "Post",
  },
  image: {
    type: String,
  },
  commentBy: {
    type: ObjectId,
    ref: "User",
  },
  commentAt: {
    type: Date,
    default: new Date(),
  },
  replies: [
    {
      reply: {
        type: ObjectId,
        ref: "Reply",
      },
    },
  ],
});

module.exports = model("Comment", commentSchema);
