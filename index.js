const http = require('http');

const host = 'localhost';
const port = '8000';
const users = [
  {
    'name': 'Sukhman',
    'FMNO': '328713',
    'id': 1,
  },
  {
    'name': 'Harbir',
    'FMNO': '328747',
    'id': 2,
  },
  {
    'name': 'John Doe',
    'FMNO': '123456',
    'id': 3
  }
];

const getUsers = (req, res) => {
  let url = req.url;
  res.writeHead(200);
  res.end('Hello World!');
};


const server = http.createServer(getUsers);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});