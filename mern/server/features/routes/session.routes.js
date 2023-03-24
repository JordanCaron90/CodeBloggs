const SessionController = require('../controllers/sessions.controller');

const registerSessionRoutes = (app) => {
    app.post('/session', SessionController.createSession);
    app.get('/session/:session_id', SessionController.getSessionByToken);
};

module.exports = {registerSessionRoutes};