const express = require('express');
const router = express.Router();

const passport = require('passport');

const Subreddit = require('../../models/Subreddit');

// @route   POST api/subreddits/new
// @desc    Add new subreddit
// @access  Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req,res) => {
    
    const name = req.body.name;

    Subreddit.findOne({name})
        .then(subreddit => {
            if(subreddit){
                return res.status(400).json({name: 'Subreddit with this name already exists'});
            }

            const newSubreddit = new Subreddit({
                name,
                user: req.user.id,
                username: req.user.login
            });

            newSubreddit.save().then(subreddit => res.json({subreddit})).catch(err => console.log(err));

        })
        .catch(err => console.log(err));

});

// @route   GET api/subreddits/:name
// @desc    Find subreddit by name and return info and posts
// @access  Public
router.get('/:name', (req,res) => {

    const name = req.params.name;
    
    Subreddit.findOne({name})
        .then(subreddit => {
            if(!subreddit){
                return res.status(400).json({error: "Subreddit with this name doesn't exists"});
            }

            res.json(subreddit);

        })
        .catch(err => console.log(err));
        
});

module.exports = router;