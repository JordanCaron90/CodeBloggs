const asyncWrapper = require('../../shared/utils/base-utils');
const JWToken = require('../../shared/utils/jwt-utils');
const Schemas = require('../../shared/db/schemas');
const Session = Schemas.SessionModel;

const insertSession = asyncWrapper( async (req, res) =>{
    let query = req.body;
        query['session_id'] = JWToken.createToken(req.body.user);
    let newSession = new Session(query);

    try{
       return await newSession.save();
    }
    catch(error){
        throw Error(`Error creating session: ${error.message}`);
    }
});


const findSessionUser = ( async (req,res) => {

    try{
        return await Session.find({session_id: req.params.session_id});
    }
    catch(error){
        throw Error(`Error getting session: ${error.message}`);
    }

});
module.exports = {insertSession, findSessionUser};