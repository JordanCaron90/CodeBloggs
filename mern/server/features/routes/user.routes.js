const UserController = require('../controllers/users.controller');


const registerUserRoutes = (app) => {
    app.post('/user/register', UserController.createUser);
    app.post('/user/login', UserController.getUserByEmailAndPassword);
};

module.exports = {registerUserRoutes};