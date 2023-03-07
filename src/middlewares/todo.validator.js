/* istanbul ignore file */
const Joi = require('joi');
const HttpError = require('../utils/HttpError');
// require axios
const axios = require('axios');

const postSchema = Joi.object({
  title: Joi.string()
    .required()
    .regex(/^\w+(?:\s+\w+)*$/),
}).required();

const updateSchema = Joi.object({
  title: Joi.string(),
  isComplete: Joi.boolean(),
})
  .required()
  .min(1);

const getSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .required()
    .regex(/^[0-9]*$/),
}).required();

const tokenSchema = Joi.object({
  token: Joi.string().required(),
});

const bodyValidator = (schema) => {
  return (req, res, next) => {
    const payLoad = req.body;
    const { error } = schema.validate(payLoad);
    if (error) {
      res.status(406);
      res.json({ message: error.message });
    } else {
      next();
    }
  };
};
const paramsValidator = (schema) => {
  return (req, res, next) => {
    const payLoad = req.params;
    const { error } = schema.validate(payLoad);
    if (error) {
      res.status(406);
      res.json({ message: error.message });
    } else {
      next();
    }
  };
};

const tokenValidator = (schema) => async (req, res, next) => {
  try {
    // const token = req.headers.token;

    // console.log('tokennnnnn-------------' + token);

    let token = req.headers['authorization'];
    token = token && token.split(' ')[1];

    console.log('tokennnnnn-------------' + token);

    const { error } = schema.validate({ token });
    if (error) {
      throw new HttpError('No token provided', 401);
    }
    // verify the token
    const response = await axios.get(`http://auth:3000/api/token/validate`, {
      headers: {
        token,
      },
    });
    console.log('axios response--------------' + response);
    if (response.status !== 200) {
      throw new HttpError('invalid token', 401);
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json({ message: error.message });
  }
};
module.exports = {
  bodyValidator,
  paramsValidator,
  postSchema,
  updateSchema,
  getSchema,
  tokenValidator,
  tokenSchema,
};
