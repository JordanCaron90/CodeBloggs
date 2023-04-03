const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const ObjectId = require("mongodb").ObjectId;
const User = Schemas.UserModel;
const Post = Schemas.PostModel;
const Comment = Schemas.CommentModel;

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
        return await User.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        });
    }
    catch(error){
        throw Error(`Error updating user: ${error.message}`);
    }
});

const findByUserIdAndDelete = asyncWrapper( async (req, res) => {
    let query = {};
    query["user_id"] = ObjectId(req.params._id);

    try{
        await Comment.deleteMany(query);
    }
    catch(error){
        throw Error(`Error deleting comments from user: ${error.message}`);
    }

    try{
        await Post.deleteMany(query);
    }
    catch(error){
        throw Error(`Error deleting postss from user: ${error.message}`);
    }

    try{
        return await User.findByIdAndDelete(req.params._id);
    }
    catch(error){
        throw Error(`Error deleting user: ${error.message}`);
    }
});

const countUsersDocuments = asyncWrapper( async (req, res) => {
    let query = {};
    if(req.query.first_name)
        query["first_name"] = { $regex: req.query.first_name, $options:'i'};
    if(req.query.last_name)
        query["last_name"] = { $regex: req.query.last_name, $options:'i'};

    try{
        return await User.countDocuments(query);
    }
    catch(error){
        throw Error(`Error deleting user: ${error.message}`);
    }
});

const findUsersPaginatedFirstAndLastName = asyncWrapper( async (req,res) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    let query = {};
    let sortQuery = {};

    if(req.query.first_name){
        query["first_name"] = { $regex: req.query.first_name, $options:'i'};
    }
    if(req.query.last_name){
        query["last_name"] = { $regex: req.query.last_name, $options:'i'};
    }
    if(req.query.sort_by && req.query.order){
        sortQuery[req.query.sort_by] = req.query.order;
    }

    try{
        return User.find(query)
                   .sort(sortQuery)
                   .skip((page-1) * limit)
                   .limit(limit);
    }
    catch(error){
        throw Error(`Error retrieving users: ${error.message}`);
    }

});

const findAndEditUser = asyncWrapper( async (req,res) => {

    try{
        return User.findByIdAndUpdate(req.params._id, req.body);
    }
    catch(error){
        throw Error(`Error retrieving users: ${error.message}`);
    }

});

module.exports = {insertUser, 
                  findUserByEmail, 
                  findUsersExceptSelf, 
                  findUserById, 
                  findUserByIdAndUpdate, 
                  findByUserIdAndDelete, 
                  findUsersPaginatedFirstAndLastName, 
                  countUsersDocuments,
                  findAndEditUser};