
const todoServices = require('../services/todoServices');

const getTodos = async (_, res) => {
  const todos = await todoServices.getTodos();
  res.status(200);
  res.json(todos);
};

const getSingleTodo = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const todo = await todoServices.getSingleTodo(id);
    res.status(200);
    res.json(todo);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const postTodo = async (req, res) => {
  const todo = await todoServices.postTodo(req.body);
  // console.log(todo.title);
  res.status(201);
  res.json(todo);
};

const deleteCompletedTodos = async (_, res) => {
  const todos = await todoServices.deleteCompletedTodos();
  res.status(200);
  res.json(todos);
};

const putTodo = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const todo = await todoServices.patchSingleTodo(id, req.body);
    res.status(200);
    res.json(todo);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const patchSingleTodo = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const todo = await todoServices.patchSingleTodo(id, req.body);
    res.status(200);
    res.json(todo);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
}

module.exports = {
  getTodos,
  getSingleTodo,
  postTodo,
  deleteCompletedTodos,
  patchSingleTodo,
  putTodo
};