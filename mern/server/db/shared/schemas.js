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

