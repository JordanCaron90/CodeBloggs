const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const ObjectId = require("mongodb").ObjectId;
const Comment = Schemas.CommentModel;
const Post = Schemas.PostModel;

const insertComment = asyncWrapper( async (req, res) =>{
    let query = req.body;
    query["user_id"] = ObjectId(req.body.user_id);
    query["post_id"] = ObjectId(req.body.post_id);
    let newComment = new Comment(query);
    let post, createdComment;

    try{
        post =  await Post.findById(req.body.post_id);
    }
    catch(error){
        throw Error(`Error finding post related to comment: ${error.message}`);
    }

    try{
        createdComment = await newComment.save();
    }
    catch(error){
        throw Error(`Error creating comment: ${error.message}`);
    }

    try{
        post.comments.push(createdComment);
        return await post.save()
    }
    catch(error){
        throw Error(`Error saving comment to post: ${error.message}`);
    }

});

module.exports = {insertComment};