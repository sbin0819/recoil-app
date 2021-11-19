import express from 'express';
import TodoController from '../controllers/todo.controller';
var router = express.Router();

router.get('/', TodoController.findAll);

router.get('/:id', TodoController.findOne);

router.post('/', TodoController.create);

router.put('/:id', TodoController.update);

router.delete('/:id', TodoController.deleteOne);

export default router;
