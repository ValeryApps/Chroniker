const { Schema, model } = require("mongoose");

const { ObjectId } = Schema;

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    topic: {
      type: String,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    reacts: [
      {
        type: ObjectId,
        ref: "React",
      },
    ],
    shares: [
      {
        type: ObjectId,
        ref: "Share",
      },
    ],
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
