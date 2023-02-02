const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required().regex(/^\w+(?:\s+\w+)*$/)
}).required();

const updateSchema = Joi.object({
  title: Joi.string(),
  isComplete: Joi.boolean(),
}).required().min(1);

const getSchema = Joi.object({
  id: Joi.string().alphanum().required().regex(/^[0-9]*$/)
}).required();


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
  }
}
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
  }
}
module.exports = { bodyValidator, paramsValidator, postSchema, updateSchema, getSchema };




