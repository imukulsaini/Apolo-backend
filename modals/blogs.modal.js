const mongoose = require("mongoose");

const { User } = require("./users.modal");

const BlogsSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bookmarkBy: [{ type: String, ref: "User" }],
  createdAt: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", BlogsSchema);

module.exports = { Blog };
