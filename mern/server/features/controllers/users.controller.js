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
        ResponseUtil.respondOk(res,data,"User successfully created.");
    }
};

const getUserById = async(req,res) => {
    const [data, error] = await UserService.findUserById(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
        return;
    }
    if(!data){
        res.status(404);
        ResponseUtil.respondError(res,null,'User not found.');
        return;
    }

    ResponseUtil.respondOk(res,data, "User found.");
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

    ResponseUtil.respondOk(res,data, "Login successful.");
};

const getUsersExceptSelf = async(req, res) =>{
    const [data, error] = await UserService.findUsersExceptSelf(req,res);

    if(error){
        res.status(400);
        ResponseUtil.respondError(res,null,error.message);
    }
    else{
        ResponseUtil.respondOk(res,data,"Users retrieved");
    }
};

const updateUserById = async(req, res) => {
    const [data,error] = await UserService.findUserByIdAndUpdate(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"User updated.");
    }
}

const deleteUserById = async(req, res) => {
    const [data,error] = await UserService.findByUserIdAndDelete(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"User deleted");
    }
}

const getUsersPaginatedFirstAndLastName = async(req,res) => {
    const [data,error] = await UserService.findUsersPaginatedFirstAndLastName(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"Users retrieved.");
    }
};

const getCountUsers = async(req,res) => {
    const [data,error] = await UserService.countUsersDocuments(req,res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null,error.message)
    }
    else{
        ResponseUtil.respondOk(res,data,"User count retrieved.");
    }
};

const editUserById = async(req,res) => {
    const [data,error] = await UserService.findAndEditUser(req, res);

    if(error){
        res.status(500);
        ResponseUtil.respondError(res,null, error.message);
    }
    else{
        ResponseUtil.respondOk(res,data, "User updated.");
    }
};

module.exports = {createUser, getUserByEmail, getUsersExceptSelf, getUserById, updateUserById, deleteUserById, getUsersPaginatedFirstAndLastName, getCountUsers, editUserById};