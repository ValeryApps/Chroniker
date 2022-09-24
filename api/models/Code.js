const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;
const codeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = model("Code", codeSchema);
