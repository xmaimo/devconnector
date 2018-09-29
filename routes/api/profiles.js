const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../models/User');
const Profile = require('../models/Profile');

// load profile validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

/**
 * @route   GET api/profile/all
 * @desc    get all profiles
 * @access  Public
 */
router.get('/all', async (req, res) => {
  const errors = {};
  try {
    const profiles = await Profile.find({}).populate('user', ['name', 'avatar']);

    if (!profiles) {
      errors.noProfiles = 'No profiles found';
      return res.status(404).json(errors);
    }

    res.json(profiles);
  } catch (error) {
    res.status(404).json({ noProfiles: 'No profiles found' });
  }
});

/**
 * @route   GET api/profile/
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      );
      errors.noProfile = 'There is no profile for this user';

      if (!profile) return res.status(404).json(errors);
      res.json(profile);
    } catch (error) {
      res.status(404).json(error);
    }
  }
); // End GET api/profile/

/**
 * @route   GET api/profile/handle/:handle
 * @desc    Get profile by handle
 * @access  Public
 */
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this handle';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}); // End GET api/profile/handle/:handle

/**
 * @route   GET api/profile/user/:user_id
 * @desc    Get profile by user ID
 * @access  Public
 */
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user ID';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => {
      res.status(404).json({ noProfile: 'There is no profile for this user' });
    });
}); // End GET api/profile/user/:user_id

/**
 * @route   POST api/profile/
 * @desc    Create or edit user profile
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check of validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) { profileFields.githubusername = req.body.githubusername; }
    // skills
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          // update
          Profile.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.user.id).toHexString() },
            { $set: profileFields },
            { new: true }
          )
            .then((profile) => {
              res.json(profile);
            })
            .catch(err => res.json(err));
        } else {
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }

              // Create / Safe profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
        }
      })
      .catch(err => res.json(err));
  }
); // End POST api/profile/

/**
 * @route   POST api/profile/experience
 * @desc    Add experience to profile
 * @access  Private
 */
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    // Check of validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const newExp = {};
        newExp.title = req.body.title;
        newExp.company = req.body.company;
        newExp.location = req.body.location;
        newExp.from = req.body.from;
        newExp.to = req.body.to;
        newExp.current = req.body.current;
        newExp.description = req.body.description;

        // Add to experience array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
); // End POST api/profile/experience

/**
 * @route   POST api/profile/education
 * @desc    Add education to profile
 * @access  Private
 */
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    // Check of validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const newEdu = {};
        newEdu.school = req.body.school;
        newEdu.degree = req.body.degree;
        newEdu.fieldofstudy = req.body.fieldofstudy;
        newEdu.from = req.body.from;
        newEdu.to = req.body.to;
        newEdu.current = req.body.current;
        newEdu.description = req.body.description;

        // Add to experience array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
); // End POST api/profile/education

/**
 * @route   DELETE api/profile/experience/:exp_id
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
); // End DELETE api/profile/experience

/**
 * @route   DELETE api/profile/education/:edu_id
 * @desc    Delete education from profile
 * @access  Private
 */
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
); // End DELETE api/profile/education

/**
 * @route   DELETE api/profile/
 * @desc    Delete user and profile
 * @access  Private
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
    });
  }
); // End DELETE api/profile/

module.exports = router;
