const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../models/Profile");
const Post = require("../models/Post");

// load post validation
const validatePostInput = require("../../validation/post");

/**
 * @route   GET api/posts/
 * @desc    Get all post
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    if (posts.length > 0) {
      res.json(posts);
    } else {
      return res.status(404).json({ noPostsFound: "No posts found" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
}); // End GET api/posts/

/**
 * @route   GET api/posts/:id
 * @desc    Get post by id
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      return res.status(404).json({ noPostFound: "Post not found" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
}); // End GET api/posts/:id

/**
 * @route   POST api/posts/
 * @desc    Create post
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check of validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      user: req.user.id,
      avatar: req.user.avatar
    });

    newPost
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(err => res.status(404).json(err));
  }
); // End POST api/posts/

/**
 * @route   DELETET api/posts/:id
 * @desc    Delete post by id
 * @access  Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await Profile.findOne({ user: req.user.id });
    if (user) {
      try {
        const post = await Post.findById(req.params.id);
        if (post) {
          // check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "You are not authorized" });
          }

          // delete
          await post.remove();
          res.json({ success: true });
        } else {
          return res.status(404).json({ noPostFound: "Post not found" });
        }
      } catch (error) {
        res.status(404).json(error);
      }
    }
  }
); // End DELETE api/posts/:id

/**
 * @route   POST api/posts/like/:id
 * @desc    Like post
 * @access  Private
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await Profile.findOne({ user: req.user.id });
    if (user) {
      try {
        const post = await Post.findById(req.params.id);
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        )
          return res
            .status(400)
            .json({ alreadyLiked: "User already liked this post" });

        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  }
); // End POST api/posts/like/:id

/**
 * @route   POST api/posts/unlike/:id
 * @desc    Like post
 * @access  Private
 */
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await Profile.findOne({ user: req.user.id });
    if (user) {
      try {
        const post = await Post.findById(req.params.id);
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        )
          return res
            .status(400)
            .json({ notLiked: "You have not yet liked this post" });

        // Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // splice out of array
        post.likes.splice(removeIndex, 1);
        await post.save();

        res.json(post);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  }
); // End POST api/posts/unlike/:id

/**
 * @route   POST api/posts/comment/:id
 * @desc    Add comment to post
 * @access  Private
 */
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check of validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id).then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post
        .save()
        .then(post => res.json(post))
        .catch(err =>
          res.status(404).json({ postNotFound: "No post found", err })
        );
    });
  }
); // End POST api/posts/comment/:id

/**
 * @route   DELETE api/posts/comment/:id/:comment_id
 * @desc    Remove comment from post
 * @access  Private
 */
router.post(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          res.status(404).json({ commentNotExist: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postNotFound: "No post found", err })
      );
  }
); // End POST api/posts/comment/:id

module.exports = router;
