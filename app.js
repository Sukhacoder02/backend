
const port = 8000;
const host = 'localhost';


const express = require('express');
const router = require('./routes/routes.js');


const app = express();
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});