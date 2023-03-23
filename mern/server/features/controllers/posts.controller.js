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

module.exports = {createPost, getPostByUser, updateLikesByOne, updateLikesByMinusOne};