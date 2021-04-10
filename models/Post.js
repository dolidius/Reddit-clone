const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    authorName: {
        type: String
    },

    subreddit: {
        type: Schema.Types.ObjectId,
        ref: 'subreddit'
    },

    subredditName: {
        type: String
    },

    date: {
        type: Number,
        default: new Date().getTime()
    },

    comments: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },

            authorName:{
                type: String
            },

            text: {
                type:String,
                required: true
            },

            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],

    upvotes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    downvotes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

});

module.exports = Post = mongoose.model('post', postSchema );