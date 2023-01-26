
const { postTodo, putTodo, deleteCompletedTodos, patchSingleTodo, getSingleTodo, getTodos } = require('./todoFunctions');
const express = require('express');

const router = express.Router();

router.route('/todos')
    .get(getTodos)
    .post(postTodo)
    .delete(deleteCompletedTodos);


router.route('/todos/:id')
    .get(getSingleTodo)
    .put(putTodo)
    .patch(patchSingleTodo);

module.exports = router;