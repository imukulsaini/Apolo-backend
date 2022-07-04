const mongoose = require("mongoose");
const { User } = require("./users.modal");
const { Blog } = require("./blogs.modal");

const BookmarkSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

module.exports = { Bookmark };
