

const http = require('http');

const host = 'localhost';
const port = 8000;


const todos = (req, res) => {

};

const server = http.createServer(todos);
server.listen(8000, () => {
    console.log(`Server is running on ${host}:${port}`);
});