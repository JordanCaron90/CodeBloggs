const UserController = require('../controllers/users.controller');


const registerUserRoutes = (app) => {
    app.post('/user/register', UserController.createUser);
};

module.exports = {registerUserRoutes};