const router = require('express').Router();

const todoController = require('../controllers/todo.js');

router.post('/', todoController.create);
router.get('/', todoController.findAll);
router.get('/:id', todoController.findOne);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;
