const todoModel = require('../models/todo');

const getTodoList = (ctx) => {
  // 获取 Todo 项列表
  ctx.body = todoModel.getList();
};

const getTodoItem = (ctx) => {
  // 获取 Todo 项
  const { i } = ctx.request.query;
  ctx.body = todoModel.getItem(i);
};

const newTodoItem = async (ctx) => {
  // 新增 Todo 项
  const item = ctx.request.body;
  ctx.body = todoModel.createItem(item);
};

const updateTodoItem = async (ctx) => {
  // 更新 Todo 项
  const { i } = ctx.request.query;
  const item = ctx.request.body;
  ctx.body = todoModel.updateItem(i, item);
};

const deleteTodoItem = (ctx) => {
  // 删除 Todo 项
  const { i } = ctx.request.query;
  ctx.body = todoModel.removeItem(i);
};

module.exports = {
  getTodoList,
  getTodoItem,
  newTodoItem,
  updateTodoItem,
  deleteTodoItem
};