const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;
const groupSchema =  new Schema({
    groupName:{
        type:String,
        require:true
    },
    followers:[
        {
            type:ObjectId,
            ref:'User'
        }
    ],
    picture: {
        type: String,
        trim: true,
        default:
          "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
      },
      following: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
      requests: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
      posts: [
        {
          post: {
            type: ObjectId,
            ref: "Post",
          },
          savedAt: {
            type: Date,
            default: new Date(),
          },
        },
      ],
      admin:{
        type:ObjectId,
        ref:'User',
        required:true
      },
      moderators:[{
        type:ObjectId,
        ref:'User',
      }]
})

module.exports = model("Group", groupSchema)