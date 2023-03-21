const UserService = require('../services/users.service');
const ResponseUtil = require('../../shared/utils/response-utils').ResponseUtil;

const createUser = async(req, res) => { 
    const [data, error] = await UserService.insertUser(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        ResponseUtil.respondOk(res,data,"User successfully created.");
    }
};

module.exports = {createUser};