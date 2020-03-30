const router = require('express').Router();
const routerTodos = require('./routerTodos');

router.use('/todos', routerTodos);

module.exports = router;