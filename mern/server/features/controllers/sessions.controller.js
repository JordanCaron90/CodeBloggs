const SessionService = require('../services/sessions.service');
const ResponseUtil = require('../../shared/utils/response-utils').ResponseUtil;

const createSession = async(req, res) => {
    const [data, error] = await SessionService.insertSession(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        res.status(201);
        ResponseUtil.respondOk(res,data,"Session successfully created.");
    }
};

module.exports = {createSession};