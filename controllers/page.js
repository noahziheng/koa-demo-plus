const todoModel = require('../models/todo');

const index = async (ctx) => {
  const versionConfig = ctx.config && ctx.config.version || {};
  await ctx.render('index', {
    versionConfig
  });
};

const dataPreload = async (ctx) => {
  const versionConfig = ctx.config && ctx.config.version || {};
  const preloadData = {
    todoList: await todoModel.getList()
  };
  await ctx.render('dataPreload', {
    versionConfig,
    preloadData
  });
};

module.exports = {
  index,
  dataPreload
};