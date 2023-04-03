const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const ObjectId = require("mongodb").ObjectId;
const Post = Schemas.PostModel;
const Comment = Schemas.CommentModel;

const insertPost = asyncWrapper( async (req, res) =>{
    let query = req.body;
    query["user_id"] = ObjectId(req.body.user_id);
    let newPost = new Post(query);

    try{
        return await newPost.save();
    }
    catch(error){
        throw Error(`Error creating post: ${error.message}`);
    }
});

const findPostsByUser = asyncWrapper( async (req,res) => { 
    try{
        return await Post.find({user_id: req.params.user_id});
    }
    catch(error){
        throw Error(`Error getting post by user: ${error}`);
    }
});

const incrementLikesByOne = asyncWrapper( async (req,res) => {
    try{
        return await Post.findOneAndUpdate({ _id: req.params.post_id },{ $inc: { likes: 1 } });
    }
    catch(error){
        throw Error(`Error updating post's likes: ${error.message}`);
    }
});

const decrementLikesByOne = asyncWrapper( async (req,res) => {
    try{
        return await Post.findOneAndUpdate({ _id: req.params.post_id },{ $inc: { likes: -1 } });
    }
    catch(error){
        throw Error(`Error updating post's likes: ${error.message}`);
    }
});

const findAllBlogPosts = asyncWrapper( async(req,res) =>{
    try{
        return await Post.find();
    }
    catch(error){
        throw Error(`Error retrieving posts: ${error.message}`);
    }
});

const findLatestBlogPost = asyncWrapper( async(req,res) => {
    try{
        return await Post.findOne({user_id: req.params.user_id}).sort({updatedAt:-1}).limit(1);
    }
    catch(error){
        throw Error(`Error retrieving latest post: ${error}`);
    }
});

const findByPostIdAndDelete = asyncWrapper( async (req, res) => {
    let query = {};
    query["post_id"] = ObjectId(req.params._id);
    try{
        await Comment.deleteMany(query);
    }
    catch (error) {
        throw Error(`Error deleting comments: ${error.message}`);
    }

    try{
        return await Post.findByIdAndDelete(req.params._id);
    }
    catch(error){
        throw Error(`Error deleting post: ${error.message}`);
    }
});

const countPostDocuments = asyncWrapper( async (req, res) => {
    try{
        return await Post.countDocuments({});
    }
    catch(error){
        throw Error(`Error deleting post: ${error.message}`);
    }
});

const findUsersPaginatedComment = asyncWrapper( async (req,res) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    let query = {};
    if(req.query.content){
        query["content"] = req.query.content;
    }
    console.log(query)
    try{
        return Post.find(query)
                   .skip((page-1) * limit)
                   .limit(limit);
    }
    catch(error){
        throw Error(`Error retrieving users: ${error.message}`);
    }

});


module.exports = {insertPost, findPostsByUser, incrementLikesByOne, decrementLikesByOne, findAllBlogPosts, findLatestBlogPost, findByPostIdAndDelete, countPostDocuments, findUsersPaginatedComment};