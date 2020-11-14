const Router = require('@koa/router');
const PageController = require('../controllers/page');

const pageRouter = new Router();

pageRouter.get('/', PageController.index); // 首页
pageRouter.get('/index', PageController.index); // 首页别名
pageRouter.get('/dataPreload', PageController.dataPreload); // 数据预加载版本

module.exports = pageRouter;