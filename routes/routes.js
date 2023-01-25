
const { postTodo, putTodo, deleteCompletedTodos, patchSingleTodo, getSingleTodo, getTodos } = require('./todoFunctions');
const express = require('express');

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getSingleTodo);
router.post('/todos', postTodo);
router.delete('/todos', deleteCompletedTodos);
router.put('/todos/:id', putTodo);
router.patch('/todos/:id', patchSingleTodo);

module.exports = router;