const router = require('express').Router();
const routerTodos = require('./routerTodos');
const controllerUser = require('../controllers/controllerUser');
const errorHandler = require('../middlewares/errorHandler');

router.post('/register', controllerUser.register);

router.post('/login', controllerUser.login);

router.use('/todos', routerTodos);

router.use(errorHandler);

module.exports = router;