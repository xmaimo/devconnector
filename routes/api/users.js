const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const keys = require('../../config/keys');
const User = require('../models/User');
// load imput validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/**
 * @route   GET api/users/
 * @desc    Tests users route
 * @access  Public
 */
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check of validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let newUser = await User.findOne({ email: req.body.email });
  errors.email = 'User already registerd';

  if (newUser) return res.status(400).json(errors);

  const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

  newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar
  });

  // password encryption
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newUser.password, salt);
  newUser.password = hash;

  await newUser.save();

  res.json(newUser);
});

/**
 * @route   POST api/users/login
 * @desc    Login user / Returning JWT
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check of validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Check for User
  let user = await User.findOne({ email });
  errors.email = 'User not found';

  if (!user) return res.status(404).json(errors);

  // Check for password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // sign token
    const token = jwt.sign(
      { id: user._id, name: user.name, avatar: user.avatar }, // payload
      keys.secretKey,
      { expiresIn: 7200 } // expires in seconds
    );

    res.json({ success: true, token: 'Bearer ' + token });
  } else {
    errors.password = 'Password Incorrect';

    return res.status(400).json(errors);
  }

  /**
   * @route   GET api/users/current
   * @desc    Return current user
   * @access  Private
   */
  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json(req.user);
    }
  );
});

module.exports = router;
