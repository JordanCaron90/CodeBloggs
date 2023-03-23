const PostController = require('../controllers/posts.controller');


const registerPostRoutes = (app) => {
    app.post('/post/add', PostController.createPost);
    app.get('/post/:user_id', PostController.getPostByUser); 
};

module.exports = {registerPostRoutes};