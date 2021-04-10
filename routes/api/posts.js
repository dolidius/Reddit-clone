const express = require('express');
const router = express.Router();

const passport = require('passport');

const Post = require('../../models/Post'); 
const Subreddit = require('../../models/Subreddit'); 

// @route   POST api/posts/:sub_name/new
// @desc    Add new post to subreddit
// @access  Private
router.post('/:sub_name/new', passport.authenticate('jwt', { session: false }) ,(req,res) => {

    const { sub_name } = req.params;
    const { title, text } = req.body;

    Subreddit.findOne({name: sub_name})
        .then(subreddit => {
            if(!subreddit){
                return res.status(404).json({error: 'Something went wrong'});
            }

            const post = new Post({
                title,
                text,
                author: req.user.id,
                authorName: req.user.login,
                subreddit: subreddit.id,
                subredditName: subreddit.name,
            });

            post.save().then(post => res.json(post)).catch(err => res.json({err}));

        })
        .catch(err => res.json(err));

});

// @route   GET api/posts/count
// @desc    Get number of all posts 
// @access  Public
router.get('/count', (req, res) => {
    Post.find().count().then(n => res.json({postsNumber: n}));
});

// @route   GET api/posts/count/subreddit/:sub_name
// @desc    Get number of all subreddit posts 
// @access  Public
router.get('/count/subreddit/:sub_name', (req, res) => {
    Post.find({subredditName: req.params.sub_name}).count().then(n => res.json({postsNumber: n}));
});

// @route   GET api/posts/count/user/:login
// @desc    Get number of all user posts 
// @access  Public
router.get('/count/user/:login', (req, res) => {
    Post.find({authorName: req.params.login}).count().then(n => res.json({postsNumber: n}));
});

// @route   GET api/posts/latest/:n
// @desc    Get lates 10 posts skiping ((n - 1) * 10) posts 
// @access  Public
router.get('/latest/:n', (req, res) => {

    let { n } = req.params;
    n = n - 1;

    Post.find().sort({date: -1}).skip(n * 10).limit(10)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));

});

// @route   GET api/posts/:sub_name/latest/:n
// @desc    Get lates 10 posts skiping ((n - 1) * 10) posts 
// @access  Public
router.get('/subreddit/:sub_name/latest/:n', (req, res) => {

    let { n, sub_name } = req.params;
    n = n - 1;

    Post.find({subredditName: sub_name}).sort({date: -1}).skip(n * 10).limit(10)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));

});

// @route   GET api/posts/:login/latest/:n
// @desc    Get lates 10 posts skiping ((n - 1) * 10) posts 
// @access  Public
router.get('/user/:login/latest/:n', (req, res) => {

    let { n, login } = req.params;
    n = n - 1;

    Post.find({authorName: login}).sort({date: -1}).skip(n * 10).limit(10)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));

});



// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req,res) => {

    const { id } = req.params;

    Post.findById(id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({post: 'Post not found'}));

});

// @route   GET api/posts/user/:login??????????????????????????????????????????????????????????????????????
// @desc    Get all posts for exact user??????????????????????????????????????????????????????????????????????
// @access  Public??????????????????????????????????????????????????????????????????????????????????????????
router.get('/user/:login', (req, res) => {

    const { login } = req.params;

    Post.find({authorName: login})
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({post: 'Posts not found'}));

});

// @route   GET api/posts/subreddit/:name ??????????????
// @desc    Get all posts for exact subreddit ???????????????????????
// @access  Public  ????????????????????????????????????????????????????????????
router.get('/subreddit/:name', (req, res) => {

    const { name } = req.params;

    Post.find({subredditName: name})
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({post: 'Posts not found'}));

});

// @route   POST api/posts/:id/comment
// @desc    Add new comment to existing post
// @access  Private
router.post('/:id/comment', passport.authenticate('jwt', { session: false }) ,(req, res) => {

    const { text } = req.body;
    const { id } = req.params;

    if(text.trim().length === 0){
        return res.status(404).json({text: "Comment can't be empty"});
    }

    Post.findById(id)
        .then(post => {

            const newComment = {
                author: req.user.id,
                authorName: req.user.login,
                text,
            }

            post.comments.unshift(newComment);

            post.save().then(post => res.json(post)).catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({post: "Post not found"}))
    

});

// @route   POST api/posts/:id/upvote
// @desc    Upvote post
// @access  Private
router.post('/:id/upvote', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { id } = req.params;

    Post.findById(id)
        .then(post => {
            if(!post){
                return res.status(404).json({post: "Post not found"});
            }

            if(post.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length > 0){
                const removeIndex = post.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);
                post.upvotes.splice(removeIndex , 1);
                return post.save().then(post => res.json(post));
            }

            if(post.downvotes.filter(downvote => downvote.user.toString() === req.user.id).length > 0){
                const removeIndex = post.downvotes.map(downvote => downvote.user.toString()).indexOf(req.user.id);
                post.downvotes.splice(removeIndex, 1);  
            }

            post.upvotes.push({user: req.user.id});
            post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({post: "Post not found"}))

});

// @route   POST api/posts/:id/upvote
// @desc    Downvote post
// @access  Private
router.post('/:id/downvote', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { id } = req.params;

    Post.findById(id)
        .then(post => {
            if(!post){
                return res.status(404).json({post: "Post not found"});
            }

            if(post.downvotes.filter(downvote => downvote.user.toString() === req.user.id).length > 0){
                const removeIndex = post.downvotes.map(downvote => downvote.user.toString()).indexOf(req.user.id);
                post.downvotes.splice(removeIndex , 1);
                return post.save().then(post => res.json(post));
            }

            if(post.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length > 0){
                const removeIndex = post.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);
                post.upvotes.splice(removeIndex, 1);  
            }

            post.downvotes.push({user: req.user.id});
            post.save().then(post => res.json(post));
        });

});

module.exports = router;