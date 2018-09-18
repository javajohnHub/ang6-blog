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

router.post("/post", (req, res) => {
  var postData = new Post(req.body);
  postData.save().catch(err => {
    res.status(400).send("Unable to save data");
  });
});

router.put("/post", (req, res) => {
  //   Post.findById(req.id, function(err, post) {
  //     if (err) return handleError(err);

  //     post.body = req.body;
  //     post.save(function(err, updatedPost) {
  //       if (err) return handleError(err);
  //       res.send(updatedPost);
  //     });
  //   });
  Post.findByIdAndUpdate(
    // the id of the item to find
    req._Id,

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    req.body,

    // an option that asks mongoose to return the updated version
    // of the document instead of the pre-updated one.
    { new: true },

    // the callback function
    (err, post) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send(post);
    }
  );
});

router.delete("/post", (req, res) => {
  Post.findByIdAndRemove(req._id, (err, post) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Post successfully deleted",
      id: post._id
    };
    return res.status(200).send(response);
  });
});
module.exports = router;
