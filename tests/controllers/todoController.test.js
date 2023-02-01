
// require todo controller
const todoController = require('../src/controllers/todoController');
// required todo services
const todoServices = require('../src/services/todoServices');

describe('todoController', () => {
  describe('function getTodos', () => {
    it('Should return an array of todos', async () => {
      const resolvedValue = [{
        title: "buy groceries",
        isComplete: false,
        id: 1,
      }];
      jest.spyOn(todoServices, 'getTodos').mockResolvedValue(resolvedValue);

      const mockReq = {};
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
      await todoController.getTodos(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
  });
  // write a test for todoController's function getSingleTodo
  describe('getSingleTodo function', () => {
    it('Should return a single todo when an id is passed in request', async () => {
      const resolvedValue = {
        title: "buy groceries",
        isComplete: false,
        id: 1
      };
      jest.spyOn(todoServices, 'getSingleTodo').mockResolvedValue(resolvedValue);
      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };

      await todoController.getSingleTodo(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
  });
  describe('function postTodo', () => {
    it('Should create a todo when passed in request\'s body', async () => {
      const resolvedValue = {
        "id": 7,
        "title": "Hit the Gym",
        "isComplete": false,
        "updatedAt": "2023-02-01T07:22:42.639Z",
        "createdAt": "2023-02-01T07:22:42.639Z"
      };
      jest.spyOn(todoServices, 'postTodo').mockResolvedValue(resolvedValue);
      const mockReq = {
        body: {
          title: "Hit the Gym"
        }
      };
      const mockRes = {
        // status: jest.fn().mockReturnValue({json: jest.fn()}),
        status: jest.fn(),
        json: jest.fn()
      }
      await todoController.postTodo(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
  });
  describe('function deleteCompletedTodos', () => {
    it('Should delete all todos whose isComplete equals true', async () => {
      const resolvedValue = [
        {
          "id": 4,
          "title": "Do Cardio",
          "isComplete": false
        },
        {
          "id": 7,
          "title": "Hit the Gym",
          "isComplete": false
        }
      ];
      jest.spyOn(todoServices, 'deleteCompletedTodos').mockResolvedValue(resolvedValue);
      const mockReq = {}
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
      await todoController.deleteCompletedTodos(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
  });
  describe('function putTodo', () => {
    it('Should update a todo with whatever is passed in request\'s body ', () => {
      const resolvedValue = {
        "id": 7,
        "title": "Do cardio",
        "isComplete": true
      };
      jest.spyOn(todoServices, 'putTodo').mockResolvedValue(resolvedValue);
      const mockReq = {
        params: {
          id: 7
        }
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };

    });
  });
});