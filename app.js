const express = require('express');

const app = express();
const port = 8000;
const host = 'localhost';


app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});