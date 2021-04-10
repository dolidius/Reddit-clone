const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    login: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    joinDate: {
        type: Date,
        required: true
    },

    background: {
        type: String
    }
    
});

module.exports = Profile = mongoose.model('profile', profileSchema);