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
        ResponseUtil.respondOk(res,data,"User successfully created.");
    }
};

module.exports = {createPost};