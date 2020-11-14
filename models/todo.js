const fs = require('fs');

const dataFilePath = './data.json';

const _checkItemValid = (item) => {
  if(!item || !item.text || !item.completed) {
    return false;
  }
  return true;
};

module.exports = {
  getList: () => {
    const jsonStr = fs.readFileSync(dataFilePath);
    return JSON.parse(jsonStr);
  },
  getItem: (i) => {
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    return list[i];
  },
  createItem: (item) => {
    if (!_checkItemValid(item)) {
      throw new Error('Invalid TodoItem!');
    }
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    list.push(item);
    return fs.writeFileSync(dataFilePath, JSON.stringify(list));
  },
  updateItem: (i, item) => {
    if (!_checkItemValid(item)) {
      throw new Error('Invalid TodoItem!');
    }
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    list[i] = item;
    return fs.writeFileSync(dataFilePath, JSON.stringify(list));
  },
  removeItem: (i) => {
    const jsonStr = fs.readFileSync(dataFilePath);
    const list = JSON.parse(jsonStr);
    list.splice(i, 1);
    return fs.writeFileSync(dataFilePath, JSON.stringify(list));
  }
};
