const Koa = require('koa');
const qs = require('querystring');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const router = require('./routes');

const responseHandler = require('./middlewares/responseHandler');
const configHandler = require('./middlewares/configHandler');

const config = require('./config');

const app = new Koa();

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

// 统一结果处理
app.use(responseHandler());

// 统一配置注入中间件
app.use(configHandler(config));

// Body 解析中间件
app.use(bodyParser());

// 静态资源
app.use(serve('./public'));

// 路由声明
app.use(router.routes(), router.allowedMethods());

app.listen(3000);