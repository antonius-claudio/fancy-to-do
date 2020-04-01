const router = require('express').Router();
const routerTodos = require('./routerTodos');
const controllerUser = require('../controllers/controllerUser');
const controllerGoogle = require('../controllers/controllerGoogle');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');

router.post('/register', controllerUser.register);

router.post('/login', controllerUser.login);

router.post('/google-sign-in', controllerGoogle.googleSignIn);

router.use('/todos', authentication, routerTodos);

router.use(errorHandler);

module.exports = router;