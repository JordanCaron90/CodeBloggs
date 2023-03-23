const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const ObjectId = require("mongodb").ObjectId;
const Post = Schemas.PostModel;

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
        return await Post.findOneAndUpdate({ _id: req.params.post_id },{ $inc: { likes: 1 } })
    }
    catch(error){
        throw Error(`Error updating post's likes: ${error.message}`);
    }

});

const decrementLikesByOne = asyncWrapper( async (req,res) => {

    try{
        return await Post.findOneAndUpdate({ _id: req.params.post_id },{ $inc: { likes: -1 } })
    }
    catch(error){
        throw Error(`Error updating post's likes: ${error.message}`);
    }

});

module.exports = {insertPost, findPostsByUser, incrementLikesByOne, decrementLikesByOne};