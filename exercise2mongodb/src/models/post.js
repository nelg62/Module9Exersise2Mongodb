const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      content: { type: String, required: true },
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
      likes: [
        {
          userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
  likes: [
    {
      userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
