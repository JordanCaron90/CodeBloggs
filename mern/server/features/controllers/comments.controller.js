const CommentService = require('../services/comments.service');
const ResponseUtil = require('../../shared/utils/response-utils').ResponseUtil;

const createComment = async(req, res) => {
    const [data, error] = await CommentService.insertComment(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(201);
        ResponseUtil.respondOk(res,data,"Comment successfully created.");
    }
};



module.exports = {createComment};