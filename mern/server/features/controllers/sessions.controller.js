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

const getSessionByToken = async(req, res) => {
    const [data, error] = await SessionService.findSessionUser(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message);
    }
    else if(data.length == 0){
        res.status(404);
        ResponseUtil.respondError(res,null,"Session not found");
    }
    else{
        res.status(200);
        ResponseUtil.respondOk(res,data,"Session found.");
    }
};

module.exports = {createSession, getSessionByToken};