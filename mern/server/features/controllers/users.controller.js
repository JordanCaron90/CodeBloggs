const UserService = require('../services/users.service');
const ResponseUtil = require('../../shared/utils/response-utils').ResponseUtil;

const createUser = async(req, res) => { 
    const [data, error] = await UserService.insertUser(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(201);
        ResponseUtil.respondOk(res,data,"User successfully created.");
    }
};

const getUserByEmailAndPassword = async(req, res) => { 
    const [data, error] = await UserService.findUserByEmailAndPassword(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else if(!data){
        res.status(403);
        ResponseUtil.respondError(res,null, "Invalid login credentials.")
    }
    else{
        ResponseUtil.respondOk(res,data,"Login credentials confirmed.");
    }
};

module.exports = {createUser, getUserByEmailAndPassword};