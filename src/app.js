/* istanbul ignore file */
const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
// require todo.validator.js
const {
  postBodyValidation,
  updateBodyValidation,
  getParamValidation,
} = require('./middlewares/todo.validator');

const port = 8000;
const host = 'localhost';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);

app.use(router);

app.listen(port, () => {
  console.log(` Todo Server running on http://${host}:${port}`);
});
