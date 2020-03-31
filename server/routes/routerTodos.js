const router = require('express').Router();
const controller = require('../controllers/controllerTodos');
const authorization = require('../middlewares/authorization');

router.post('/', controller.create);

router.get('/', controller.getTodos);

router.get('/:id/event', authorization, controller.addEvent);

router.get('/:id', authorization, controller.getById);

router.put('/:id', authorization,controller.update);

router.delete('/:id', authorization, controller.delete);

module.exports = router;