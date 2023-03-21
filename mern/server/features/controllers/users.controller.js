const UserService = require('../services/users.service');
const ResponseUtil = require('../../shared/utils/response-utils');

const createUser = async(req, res) => { 
    const [data, error] = await UserService.insert(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        ResponseUtil.respongOk(res,data,"User successfully created.");
    }
  };