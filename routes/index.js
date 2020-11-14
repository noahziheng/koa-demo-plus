const Router = require('@koa/router');

const apiRouter = require('./api');
const pageRouter = require('./page');

const router = new Router();

const nestedRoutes = [
  apiRouter, // API路由
  pageRouter // 页面路由
];
for (var subRouter of nestedRoutes) {
  // 路由聚合
  router.use(subRouter.routes(), subRouter.allowedMethods())
};

module.exports = router;
