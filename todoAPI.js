const http = require('http');
const qs = require('qs');

const host = 'localhost';
const port = 8000;

let todos = [
  {
    "id": 1,
    "task": "buy groceries",
    "isComplete": false
  },
  {
    "id": 2,
    "task": "learn backend",
    "isComplete": false
  }
];


const todoListener = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  let reqUrl = req.url;
  let reqMethod = req.method;
  if (reqMethod === 'GET') {
    if (reqUrl === '/todos') {
      res.write(JSON.stringify(todos));
      res.end();
    } else if (reqUrl.startsWith('/todos/')) {
      const todoId = Number(reqUrl.substring(7));
      if (todoId) {
        let foundTodo = todos.find((todo) => todo['id'] === todoId);
        if (foundTodo) {
          res.write(JSON.stringify(foundTodo));
          res.end();
        } else {
          res.write('Todo not found!');
        }
      } else {
        res.write('Todo not found!');
        res.end();
      }
    }
  }
};

const server = http.createServer(todoListener);
server.listen(8000, () => {
  console.log(`Server is running on http://${host}:${port}`);
});