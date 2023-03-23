const UserController = require('../controllers/users.controller');
const Userhash = require('../middleware/hash/users.hash')


const registerUserRoutes = (app) => {
    app.post('/user/register', Userhash.hashPassword, UserController.createUser);
    app.post('/user/login', UserController.getUserByEmail);
    app.get('/users/:user_id', UserController.getUsersExceptSelf);
    app.get('/user/:user_id', UserController.getUserById);
}
module.exports = {registerUserRoutes};