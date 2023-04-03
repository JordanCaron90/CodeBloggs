const PostService = require('../services/posts.service');
const ResponseUtil = require('../../shared/utils/response-utils').ResponseUtil;

const createPost = async(req, res) => {
    const [data, error] = await PostService.insertPost(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(201);
        ResponseUtil.respondOk(res,data,"Post successfully created.");
    }
};

const getPostByUser = async(req,res) => {
    const [data, error] = await PostService.findPostsByUser(req,res);

    if(error || !data){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(200);
        ResponseUtil.respondOk(res,data,"Posts retrieved");
    }
};

const updateLikesByOne = async(req,res) => {
    const [data, error] = await PostService.incrementLikesByOne(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(200);
        ResponseUtil.respondOk(res,data,"Post liked.");
    }
};

const updateLikesByMinusOne = async(req,res) => {
    const [data, error] = await PostService.decrementLikesByOne(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(200);
        ResponseUtil.respondOk(res,data,"Post unliked.");
    }
};

const getAllBlogPosts = async(req,res) => {
    const [data, error] = await PostService.findAllBlogPosts(req,res);

    if(error || !data){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(200);
        ResponseUtil.respondOk(res,data,"Posts retrieved");
    }
};

const getLatestBlogPost = async(req,res) => {
    const [data, error] = await PostService.findLatestBlogPost(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,data,error.message);
    }
    else if(!data){
        res.status(404);
        ResponseUtil.respondError(res,data,"No post found.");
    }
    else{
        res.status(200);
        ResponseUtil.respondOk(res,data,"Latest post retrieved.");
    }
};

const deletePostById = async(req, res) => {
    const [data,error] = await PostService.findByPostIdAndDelete(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"Post deleted");
    }
};

const getCountPosts = async(req,res) => {
    console.log('iamworking');
    const [data,error] = await PostService.countPostDocuments(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"User count retrieved.");
    }
};

const getUsersPaginatedComment = async(req,res) => {
    const [data,error] = await PostService.findUsersPaginatedComment(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"Posts retrieved.");
    }
};


module.exports = {createPost, getPostByUser, updateLikesByOne, updateLikesByMinusOne, getAllBlogPosts, getLatestBlogPost, deletePostById, getCountPosts, getUsersPaginatedComment};