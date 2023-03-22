const { ObjectId } = require('mongodb');
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
        default: "basic",
        lowercase: true
    }
});

const CommentSchema = new Schema(
    {
        post_id: {
            type: ObjectId, 
            required: true
        },
        user_id:  {
            type: ObjectId,
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
    },
    {
        timestamps: true,
    },
);

const PostSchema = new Schema(
    {
        user_id: {
            type: ObjectId, 
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

        comments: { 
            type: [CommentSchema],
            default: []
        }
    },
    {
        timestamps: true,
    },
);

const SessionSchema = new Schema({
    session_id: {
         type: String, 
         required: true
    },
    session_date:  {
         type: Date,
         default: new Date()
    },
    user: { 
        type: UserSchema,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);
const CommentModel = mongoose.model('Comment', CommentSchema);
const PostModel = mongoose.model('Post', PostSchema);
const SessionModel = mongoose.model('Session', SessionSchema);

module.exports = {UserModel, CommentModel, PostModel, SessionModel};