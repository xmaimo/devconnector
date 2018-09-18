const express = require('express');
const router = express.Router();

// @route   GET api/profile/
// @desc    Tests profile route
// @access  Public
router.get('/', (req, res) => res.send('Hello Profile'));

module.exports = router;