
const { getTodos, getSingleTodo, postTodo, deleteCompletedTodos, patchSingleTodo, putTodo } = require('../controllers/todoController');
const express = require('express');

// require todo.validator.js
const { bodyValidator, paramsValidator, postSchema, updateSchema, getSchema } = require('../middlewares/todo.validator');
const { valid } = require('joi');


const router = express.Router();



router.get('/todos', getTodos);
router.get('/todos/:id', paramsValidator(getSchema), getSingleTodo);

router.post('/todos', bodyValidator(postSchema), postTodo);

router.put('/todos/:id', paramsValidator(getSchema), bodyValidator(updateSchema), putTodo);

router.patch('/todos/:id', paramsValidator(getSchema), bodyValidator(updateSchema), patchSingleTodo);

router.delete('/todos/completed', deleteCompletedTodos);



module.exports = router;