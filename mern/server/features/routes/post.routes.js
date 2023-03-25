const PostController = require('../controllers/posts.controller');

const registerPostRoutes = (app) => {
    app.post('/post/add', PostController.createPost);
    app.get('/post/:user_id', PostController.getPostByUser);
    app.put('/post/like/:post_id', PostController.updateLikesByOne);
    app.put('/post/unlike/:post_id', PostController.updateLikesByMinusOne);
    app.get('/posts', PostController.getAllBlogPosts);
    app.get('/post/latest/:user_id', PostController.getLatestBlogPost);
};

module.exports = {registerPostRoutes};