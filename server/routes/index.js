var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const MONGO_URL =
  "mongodb://admin:admin123@ds261332.mlab.com:61332/heroku_cc8hqd82";

mongoose.connect(
  MONGO_URL,
  (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
    }
  }
);
var postSchema = new mongoose.Schema({ body: String, _id: Number });
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

router.put("/addpost", (req, res) => {
  Post.findById(id, function(err, post) {
    if (err) return handleError(err);

    post.body = req.body;
    post.save(function(err, updatedPost) {
      if (err) return handleError(err);
      res.send(updatedPost);
    });
  });
});
module.exports = router;
