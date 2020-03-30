const router = require('express').Router();
const controller = require('../controllers/controllerTodos');

router.post('/', controller.create);
router.get('/', controller.getTodos);

module.exports = router;