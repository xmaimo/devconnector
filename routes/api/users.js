const express = require('express');
const router = express.Router();

// @route   GET api/users/
// @desc    Tests users route
// @access  Public
router.get('/', (req, res) => res.json({ msg: 'Hello Router' }));

module.exports = router;
