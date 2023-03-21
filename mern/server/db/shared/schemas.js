const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
         type: String, 
         required: true
    },
    last_name:  {
         type: String,
         required: true
    },
    birthday: { 
        type: Date,
        required: true,
    }, 
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: { 
        type: String,
        required: true
    },
    status: { 
        type: String
    },
    location: { 
        type: String
    },
    occupation: { 
        type: String,
        required: true,
        lowercase: true
    },
    auth_level: { 
        type: String,
        required: true,
        lowercase: true
    }
});

const CommentSchema = new Schema({
    post_id: {
         type: String, 
         required: true
    },
    user_id:  {
         type: String,
         required: true
    },
    content:  {
        type: String,
        required: true
    },
    likes: { 
        type: Number,
        default: 0,
        min: 0
    },
    time_stamp: { 
        type: String,
        required: true,
        lowercase: true
    },
});

const PostSchema = new Schema({
    user_id: {
         type: String, 
         required: true
    },
    content:  {
         type: String,
         required: true
    },
    likes: { 
        type: Number,
        default: 0,
        min: 0
    }, 
    time_stamp: { 
        type: String,
        required: true,
        lowercase: true
    }, 
    comments: { 
        type: [CommentSchema],
        default: []
    }
});

const SessionSchema = new Schema({
    session_id: {
         type: String, 
         required: true
    },
    session_date:  {
         type: Date,
         default: new Date()
    },
    likes: { 
        type: Number,
        default: 0,
        min: 0
    }
});