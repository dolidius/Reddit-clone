const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegister(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({$or: [{login: req.body.login}, {email: req.body.email}]})
        .then(user => {
            if(user){
                return res.status(400).json({error: "User with this data already exists"});
            }

            const newUser = new User({
                login: req.body.login,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err)throw err;
                    newUser.password = hash;
                    newUser.save().then(user =>{
                        
                        const profile = new Profile({
                            user: user._id,
                            avatar: user.avatar,
                            joinDate: user.date,
                            login: user.login
                        });

                        profile.save().then(profile => res.json(profile)).catch(err => console.log(err));

                    }).catch(err => console.log(err));
                });
            });

        })
        .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLogin(req.body);

    if(!isValid){
        return res.status(400).json(errors);        
    }

    const login = req.body.login;
    const password = req.body.password;

    User.findOne({login})
        .then(user => {
            if(!user){
                errors.login = "User not found";
                return res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            id: user.id,
                            login: user.login,
                            avatar: user.avatar
                        }

                        jwt.sign(payload, config.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({success: true, token: `Bearer ${token}`});
                        });
                    }else{
                        errors.password = "Password incorrect";
                        return res.status(400).json(errors);
                    }
                })

        })
        .catch(err => console.log(err));

});

// @route   GET api/users/current
// @desc    Get current logged in user info
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) => {

    const user = {
        id: req.user.id,
        login: req.user.login,
        email: req.user.email,
        avatar: req.user.avatar
    }

    res.json(user);

});

module.exports = router;