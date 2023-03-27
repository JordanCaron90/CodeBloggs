const CommentController = require('../controllers/comments.controller');

const registerCommentRoutes = (app) => {
    app.post('/comment/add', CommentController.createComment);
};

module.exports = {registerCommentRoutes};