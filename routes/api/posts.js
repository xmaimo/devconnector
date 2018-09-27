const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../models/Profile');
const Post = require('../models/Post');

// load post validation
const validatePostInput = require('../../validation/post');

/**
 * @route   GET api/posts/
 * @desc    Get all post
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    if (posts.length > 0) {
      res.json(posts);
    } else {
      return res.status(404).json({ noPostsFound: 'No posts found' });
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
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      return res.status(404).json({ noPostFound: 'Post not found' });
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
  '/',
  passport.authenticate('jwt', { session: false }),
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
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await Profile.findOne({ user: req.user.id });
    if (user) {
      try {
        const post = await Post.findById(req.params.id);
        if (post) {
          // check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuthorized: '' });
          }

          // delete
          await post.remove();
          res.json({ success: true });
        } else {
          return res.status(404).json({ noPostFound: 'Post not found' });
        }
      } catch (error) {
        res.status(404).json(error);
      }
    }
  }
); // End GET api/posts/:id

module.exports = router;
