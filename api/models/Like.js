const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const likeSchema = new Schema({
  likeBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = model("Like", likeSchema);
