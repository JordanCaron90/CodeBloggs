const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const Post = Schemas.PostModel;

const insertPost = asyncWrapper( async (req, res) =>{
    let body = req.body;
    let newPost = new Post(body);

    try{
       return await newPost.save();
    }
    catch(error){
        throw Error(`Error creating post: ${error.message}`);
    }
});

module.exports = {insertPost};