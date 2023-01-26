
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
let id = 2;

const postTodo = (req, res) => {
  let obj = req.body;
  todos.push({ ...req.body, "isComplete": false, "id": id + 1 });
  id++;
  res.status(201);
  res.send(obj);
}

const getTodos = (_, res) => {
  res.status(200);
  res.send(todos);
}

const getSingleTodo = (req, res) => {
  const id = Number(req.params.id);
  if (id) {
    let foundTodo = todos.find(todo => todo['id'] === id);
    res.status(200);
    res.send(foundTodo === undefined ? 'Cannot find given todo' : foundTodo);
  }

}

const deleteCompletedTodos = (req, res) => {
  res.status(204);
  todos = todos.filter((todo) => todo.isComplete === !true);
  res.send(todos);
};

const patchSingleTodo = (req, res) => {
  let obj = req.body;
  const id = Number(req.params.id);
  if (id) {
    let foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      Object.assign(foundTodo, obj);
    }
    res.status(204).send();
  }
};

const putTodo = (req, res) => {
  const obj = req.body;
  const id = Number(req.params.id);
  if (id) {
    obj.isComplete = false;
    obj.id = id;
    todos.splice(id - 1, 0, obj);
    todos.splice(id, 1);
    res.status(200).send(obj);
  }
};

module.exports = { postTodo, putTodo, deleteCompletedTodos, patchSingleTodo, getSingleTodo, getTodos };