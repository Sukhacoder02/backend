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
  } else if (reqMethod === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', _ => {
      let dataObj = JSON.parse(data);
      dataObj['isCompleted'] = false;
      dataObj["id"] = todos.length + 1;
      todos.push(dataObj);
    });
    res.writeHead(201);
    res.write('Created new Task', 'utf-8', null);
    res.end();

  } else if (reqMethod === 'DELETE') {
    if (reqUrl === '/todos') {
      todos = todos.filter((todo) => todo.isComplete === false);
      res.write('Successfully deleted completed todos.');
      res.end();
    }
  } else if (reqMethod === 'PATCH') {
    if (reqUrl.startsWith('/todos/')) {
      const todoId = Number(reqUrl.substring(7));
      if (todoId) {
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', _ => {
          let dataObj = JSON.parse(data);
          let foundTodo = todos.find((todo) => todo['id'] === todoId);
          found = foundTodo;
          Object.assign(foundTodo, dataObj);
        });
        res.writeHead(200, 'Successfully PATCHED');
        res.end();
      }
    }
  } else if (reqMethod === 'PUT') {
    if (reqUrl.startsWith('/todos/')) {
      const todoId = reqUrl.substring(7);
      if (todoId) {
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', _ => {
          let dataObj = JSON.parse(data);
          todos.splice(todoId - 1, 0, dataObj);
          todos.splice(todoId, 1);
        });
        res.writeHead(204, 'No Content');
        res.end('Successfully PUT');
      }
    }
  }
  res.end();
};

const server = http.createServer(todoListener);
server.listen(8000, () => {
  console.log(`Server is running on http://${host}:${port}`);
});