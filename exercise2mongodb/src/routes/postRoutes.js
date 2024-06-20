const express = require("express");
const router = express.Router();
let Controllers = require("../controllers");

router.post("/create", (req, res) => {
  Controllers.postController.createPost(req.body, res);
});

router.post("/:postid/like", (req, res) => {
  Controllers.postController.likePost(req, res);
});

router.post("/:postid/comments", (req, res) => {
  Controllers.postController.addComment(req, res);
});

router.get("/user/:userid", (req, res) => {
  Controllers.postController.getUserPosts(req, res);
});

module.exports = router;
