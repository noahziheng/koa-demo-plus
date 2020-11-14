const Router = require('@koa/router');
const ApiController = require('../controllers/api');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/todos', ApiController.getTodoList); // 获取 Todo 项列表
apiRouter.get('/todo', ApiController.getTodoItem); // 获取 Todo 项
apiRouter.post('/todo', ApiController.newTodoItem); // 新增 Todo 项
apiRouter.patch('/todo', ApiController.updateTodoItem); // 更新 Todo 项
apiRouter.delete('/todo', ApiController.deleteTodoItem); // 删除 Todo 项

module.exports = apiRouter;