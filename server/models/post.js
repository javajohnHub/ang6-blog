let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: "String", required: true },
  content: { type: "String", required: true },
  slug: { type: "String", required: true },
  cuid: { type: "String", required: true },
  dateAdded: { type: "Date", default: Date.now, required: true }
});

let Post = mongoose.model("Post", postSchema);

module.exports = Post;
