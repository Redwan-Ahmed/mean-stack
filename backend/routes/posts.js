const express = require("express");
const Post = require('../models/post');
const multer = require("multer");

// we use checkAuth to see if the user is logged in and able to edit/delete/add posts.
// we pass the checkAuth in the function without (), as js will automatically access the file.
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

// import the controller file to access our functions
const PostController = require("../controllers/post");

const router = express.Router();

//save post or add post
router.post("", checkAuth, extractFile, PostController.createPost);

//update method
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

//get posts
router.get("", PostController.getPosts);

// get a post
router.get("/:id", PostController.getPost);

// delete post
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
