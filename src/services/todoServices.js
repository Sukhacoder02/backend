const { Task } = require('../database/models');
// require the HttpError class
const HttpError = require('../utils/HttpError');



const todoServices = {
  'postTodo': async (body) => {
    const newTodo = await Task.create({ ...body, isComplete: false });
    return newTodo;
  },
  'getTodos': async () => {
    const allTasks = await Task.findAll({
      attributes: ['id', 'title', 'isComplete']
    });
    return allTasks;
  },
  'getSingleTodo': async (id) => {
    const thisTask = await Task.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'title', 'isComplete']
    });
    if (!thisTask) {
      throw new HttpError('Task not found', 404);
    }
    return thisTask;
  },
  'deleteCompletedTodos': async () => {
    await Task.destroy({
      where: {
        isComplete: true
      }
    });
    return await Task.findAll({
      attributes: ['id', 'title', 'isComplete']
    });
  },
  'patchSingleTodo': async (id, body) => {
    await Task.update(body, {
      where: {
        id: id
      },
    });
    const updatedTodo = await Task.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'title', 'isComplete']
    });
    if (!updatedTodo) {
      throw new HttpError('Task not found', 404);
    }
    return updatedTodo;

  },
  'putTodo': async (id, body) => {
    await Task.update(body, {
      where: {
        id: id
      },
    });
    const updatedTodo = await Task.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'title', 'isComplete']
    });
    if (!updatedTodo) {
      throw new HttpError('Task not found', 404);
    }
    return updatedTodo;
  }
};

module.exports = todoServices;