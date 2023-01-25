
let todos = [
  {
    "task": "buy groceries",
    "isComplete": false,
    "id": 1
  },
  {
    "task": "learn express",
    "isComplete": false,
    "id": 2
  }
];

const postTodo = (req, res) => {
  let obj = req.body;
  obj.isComplete = false;
  obj.id = todos.length + 1;
  todos.push(obj);
  res.status(201);
  res.send(obj);
}

const getTodos = (req, res) => {
  res.status(200);
  res.send(todos);
}

const getSingleTodo = (req, res) => {
  let id = Number(req.params.id);
  let foundTodo = todos.find(todo => todo['id'] === id);
  res.status(200);
  res.send(foundTodo === undefined ? 'Cannot find given todo' : foundTodo);
}

const deleteCompletedTodos = (req, res) => {
  res.status(204);
  todos = todos.filter((todo) => todo.isComplete === !true);
  res.send(todos);
};

const patchSingleTodo = (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  if (id) {
    let foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      Object.assign(foundTodo, obj);
    }
    res.status(204);
    res.send();
  }
};

const putTodo = (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  if (id) {
    obj.isComplete = false;
    obj.id = id;
    todos.splice(id - 1, 0, obj);
    todos.splice(id, 1);
  }
  res.status(204);
  res.send();
};

module.exports = { postTodo, putTodo, deleteCompletedTodos, patchSingleTodo, getSingleTodo, getTodos };