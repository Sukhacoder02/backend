
const express = require('express');


const app = express();
app.use(express.json());
const port = 8000;
const host = 'localhost';


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


app.get('/', (req, res) => {
  res.send('Welcome to Todo App');
  res.setHeader('Content-Type', 'application/json');
});


app.get('/todos', (req, res) => {
  res.status(200);
  res.send(todos);
});

app.get('/todos/:id', (req, res) => {
  let id = Number(req.params.id);
  let foundTodo = todos.find(todo => todo['id'] === id);
  res.send(foundTodo === undefined ? 'Cannot find given todo' : foundTodo);
});

app.post('/todos', (req, res) => {
  let obj = req.body;
  obj.isComplete = false;
  obj.id = todos.length + 1;
  todos.push(obj);
  res.status(201);
  res.send(obj);
});


app.put('/todos/:id', (req, res) => {
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
});

app.patch('/todos/:id', (req, res) => {
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
});

app.delete('/todos', (req, res) => {
  res.status(204);
  todos = todos.filter((todo) => todo.isComplete === !true);
  res.send(todos);
});

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});