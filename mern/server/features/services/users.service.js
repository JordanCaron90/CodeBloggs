const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const User = Schemas.UserModel;

const insertUser = asyncWrapper( async (req, res) =>{
    let body = req.body;
    let newUser = new User(body);

    try{
        if(await User.findOne({email:req.body.email})){
            throw Error(`user already exists.`);
        }
        return await newUser.save();
    }
    catch(error){
        throw Error(`Error creating user: ${error.message}`);
    }
});

const findUserById = asyncWrapper( async (req,res) => {
    
    try{
        return await User.findById(req.params.user_id);
    }
    catch(error){
        throw Error(`Error finding user: ${error.message}`);
    }
});

const findUserByEmail = asyncWrapper( async (req, res) =>{
    let body = req.body;
    let query = {};

    query["email"] = body.email;

    try{
        return await User.findOne(query);
    }
    catch(error){
        throw Error(`Error finding user: ${error.message}`);
    }

});

const findUsersExceptSelf = asyncWrapper( async (req, res) =>{

    try{
        const users = await User.find({_id: { $nin: req.params.user_id}});
        return users;
    }
    catch(error){
        throw Error(`Error finding users: ${error.message}`);
    }

});

const findUserByIdAndUpdate = asyncWrapper( async (req, res) => { 

    try{
        return user = await User.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        });
    }
    catch(error){
        throw Error(`Error updating user: ${error.message}`);
    }

});

const findByUserIdAndDelete = asyncWrapper( async (req, res) => {

    try{
        return user = await User.findByIdAndDelete(req.params._id);
    }
    catch(error){
        throw Error(`Error deleting user: ${error.message}`);
    }
});

module.exports = {insertUser, findUserByEmail, findUsersExceptSelf, findUserById, findUserByIdAndUpdate, findByUserIdAndDelete};