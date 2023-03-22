const bcrypt = require('bcrypt');
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
        ResponseUtil.respondOk(res,{data: data},"User successfully created.");
    }
};

const getUserByEmail = async(req, res) => { 
    const [data, error] = await UserService.findUserByEmail(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
        return;
    }
    if(!data){
        res.status(403);
        ResponseUtil.respondError(res,null, "Invalid login credentials.");
        return;
    }

    if(!await bcrypt.compare(req.body.password, data.password)){
        res.status(403);
        ResponseUtil.respondError(res,null, "Invalid login credentials.");
        return;
    }

    ResponseUtil.respondOk(res,{data: data}, "Login successful.");
};

module.exports = {createUser, getUserByEmail};