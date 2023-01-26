const http = require('http');

const host = 'localhost';
const port = '8000';

const getUsers = (req, res) => {
  let url = req.url;
  res.writeHead(200);
  if (url === '/users') {
    res.write(JSON.stringify(users, null, 2));
    res.end();
  } else if (url.startsWith('/users/')) {
    let idStr = url.substring(7);
    let idNum = Number(idStr);
    if (!isNaN(idNum)) {
      let foundUser = users.find((user) => user['id'] === idNum);
      if (foundUser) {
        res.write(JSON.stringify(foundUser));
        res.end();
      } else {
        res.writeHead(404);
        res.write('User not found!');
        res.end();
      }
    } else {
      res.writeHead(404);
      res.write('User not found!');
    }
  }
  else {
    res.end('Hello World!');
  }
};


const server = http.createServer(getUsers);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});