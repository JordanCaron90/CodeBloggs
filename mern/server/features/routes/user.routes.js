const UserController = require('../controllers/users.controller');
const Userhash = require('../middleware/hash/users.hash')


const registerUserRoutes = (app) => {
    app.post('/user/register', Userhash.hashPassword, UserController.createUser);
    app.post('/user/login', UserController.getUserByEmail);
};

module.exports = {registerUserRoutes};