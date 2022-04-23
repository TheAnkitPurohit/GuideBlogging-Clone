// getting-started.js
const mongoose = require("mongoose");

// Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//   Model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
