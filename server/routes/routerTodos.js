const router = require('express').Router();
const controller = require('../controllers/controllerTodos');

router.post('/', controller.create);

router.get('/', controller.getTodos);

router.get('/:id', controller.getById);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;