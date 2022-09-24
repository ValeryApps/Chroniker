const { Schema, model } = require("mongoose");

const { ObjectId } = Schema;

const shareSchema = new Schema(
  {
    post: {
      type: ObjectId,
      ref: "Post",
    },
    sharedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Share", shareSchema);
