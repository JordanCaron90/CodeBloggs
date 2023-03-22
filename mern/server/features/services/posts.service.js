const asyncWrapper = require('../../shared/utils/base-utils');
const Schemas = require('../../shared/db/schemas');
const Post = Schemas.PostModel;

const insertPost = asyncWrapper( async (req, res) =>{
    let query = req.body;

    let newPost = new Post(query);

    try{
       return await newPost.save();
    }
    catch(error){
        throw Error(`Error creating post: ${error.message}`);
    }
});

module.exports = {insertPost};