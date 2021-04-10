const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/:login
// @desc    Find profile by login
// @access  Public
router.get('/:login', (req, res) => {

    const { login } = req.params;
    
    Profile.findOne({login})
        .then(profile => {
            if(!profile){
                res.status(404).json({notFound: "Profile not found"});
            }

            res.json(profile);   
        })
        .catch(err => res.status(404).json({notFound: "Profile not found"}));

});

// @route   POST api/profile/:login/edit
// @desc    Edit profile
// @access  Private
router.post('/:login/edit', passport.authenticate('jwt', { session: false } ), (req, res) => {

    const { login } = req.params;

    Profile.findOne({login})
        .then(profile => {
            if(!profile){
                return res.status(404).json({notFound: 'Profile not found'});
            }

            if(req.body.avatar){
                profile.avatar = req.body.avatar;
                User.findOne({login})
                    .then(user => {
                        user.avatar = req.body.avatar;
                        user.save();
                    });
            } 
            if(req.body.background)profile.background = req.body.background; 
            if(req.body.description)profile.description = req.body.description; 
            profile.save().then(savedProfile => res.json(savedProfile)).catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({notFound: 'Profile not found'}));
    
});

module.exports = router;