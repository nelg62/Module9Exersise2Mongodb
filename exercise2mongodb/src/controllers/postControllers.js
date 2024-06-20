"use strict";
let Models = require("../models");

const createPost = (data, res) => {
  Models.Post.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const likePost = (req, res) => {
  Models.Post.findByIdAndUpdate(
    req.params.postid,
    { $push: { likes: { userid: req.body.userid, createdAt: new Date() } } },
    { new: true }
  )
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const addComment = (req, res) => {
  const comment = {
    content: req.body.content,
    userid: req.body.userid,
    createdAt: new Date(),
  };
  Models.Post.findByIdAndUpdate(
    req.params.postid,
    { $push: { comments: comment } },
    { new: true }
  )
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUserPosts = (req, res) => {
  // finds all posts for a given user and populates with user details
  Models.Post.find({ userid: req.params.userid })
    .populate({ path: "userid", select: "username email" })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
module.exports = {
  createPost,
  getUserPosts,
  likePost,
  addComment,
};
