const SessionController = require('../controllers/sessions.controller');


const registerSessionRoutes = (app) => {
    app.post('/session/:user_id', SessionController.createSession);
};

module.exports = {registerSessionRoutes};