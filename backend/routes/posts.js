const express = require("express");
const PostController = require("../controllers/posts");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth"); // use to check permission
const extractFile = require("../middleware/file");

const router = express.Router();



// Save data to database
router.post(
  "",
  checkAuth, // check authentication before storing data
  extractFile,
  PostController.createPost
);

// Update one piece of posts
router.put(
  "/:id",
  checkAuth,
  extractFile,
  PostController.updatePost
);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

// Delete data form database
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
