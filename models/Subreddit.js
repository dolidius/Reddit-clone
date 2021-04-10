const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subredditSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    username: {
        type: String
    },

    admins: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },

            username: {
                type: String
            }
            
        }
    ],

    followers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ]

});

module.exports = Subreddit = mongoose.model('subreddit', subredditSchema);