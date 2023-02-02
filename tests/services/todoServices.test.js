
// require todo services
const todoServices = require('../../src/services/todoServices');
// require todo controller
const todoController = require('../../src/controllers/todoController');
// require task model
const { Task } = require('../../src/database/models');
const HttpError = require('../../src/utils/HttpError');


describe('todoServices', () => {
  describe('function Task.create', () => {
    it('Should create a task in the DB', async () => {
      const resolvedValue = {
        "id": 11,
        "title": "lasjkflajlf",
        "isComplete": false,
        "updatedAt": "2023-02-01T16:03:21.688Z",
        "createdAt": "2023-02-01T16:03:21.688Z"
      };
      jest.spyOn(Task, 'create').mockResolvedValue(resolvedValue);
      const mockBody = {
        title: 'lasjkflajlf'
      };
      const result = await todoServices.postTodo(mockBody);
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('function Task.findOne', () => {
    it('Should return a single todo when request\'s actually exists', async () => {
      const resolvedValue = {
        "id": 11,
        "title": "lasjkflajlf",
        "isComplete": false,
      };
      jest.spyOn(Task, 'findOne').mockResolvedValue(resolvedValue);
      const mockId = 11;
      const result = await todoServices.getSingleTodo(mockId);
      expect(result).toEqual(resolvedValue);
    });
    it('Should throw a 404 error if id doesn\'t exists', async () => {
      const err = new HttpError('Task not found', 404);
      jest.spyOn(Task, 'findOne').mockResolvedValue(null);
      const mockId = 11;
      await expect(todoServices.getSingleTodo(mockId)).rejects.toThrow(err);
    });
  });
  describe('function Task.findAll', () => {
    it('Should return all the tasks in the DB', async () => {
      const resolvedValue = [
        {
          "id": 16,
          "title": "Do cardio",
          "isComplete": false
        },
        {
          "id": 17,
          "title": "Hit the Gym",
          "isComplete": false
        }];
      jest.spyOn(Task, 'findAll').mockResolvedValue(resolvedValue);
      const result = await todoServices.getTodos();
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('function Task.destroy()', () => {
    it('Should delete all rows which meet a specific condition', async () => {
      const resolvedValue = [
        {
          "id": 16,
          "title": "Do cardio",
          "isComplete": false
        },
        {
          "id": 17,
          "title": "Hit the Gym",
          "isComplete": false
        }];
      jest.spyOn(Task, 'destroy').mockResolvedValue(resolvedValue);
      const result = await todoServices.deleteCompletedTodos();
      expect(result).toEqual(resolvedValue);
    });
  });
});