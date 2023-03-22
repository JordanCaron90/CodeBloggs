const PostController = require('../controllers/posts.controller');


const registerPostRoutes = (app) => {
    app.post('/post/add', PostController.createPost);
};

module.exports = {registerPostRoutes};