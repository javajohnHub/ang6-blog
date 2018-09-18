var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model("Post", postSchema);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendfile("dist/index.html");
});

router.get("/posts", function(req, res, next) {
  Post.find({}, (err, posts) => {
    res.json({ posts: posts });
  });
});

router.post("/addpost", (req, res) => {
  var postData = new Post(req.body);
  postData.save().catch(err => {
    res.status(400).send("Unable to save data");
  });
});
module.exports = router;
