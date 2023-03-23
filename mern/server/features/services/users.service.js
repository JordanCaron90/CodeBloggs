const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const User = Schemas.UserModel;

const insertUser = asyncWrapper( async (req, res) =>{
    let body = req.body;
    let newUser = new User(body);

    try{
       return await newUser.save();
    }
    catch(error){
        throw Error(`Error creating agent: ${error.message}`);
    }
});

const findUserByEmail = asyncWrapper( async (req, res) =>{
    let body = req.body;
    let query = {};

    query["email"] = body.email;

    try{
        return await User.findOne(query);
    }
    catch(error){
        throw Error(`Error finding user: ${error.message}`);
    }

});

const findUsersExceptSelf = asyncWrapper( async (req, res) =>{

    try{
        const users = await User.find({_id: { $nin: req.params.user_id}});
        return users;
    }
    catch(error){
        throw Error(`Error finding users: ${error.message}`);
    }

});

module.exports = {insertUser, findUserByEmail, findUsersExceptSelf};