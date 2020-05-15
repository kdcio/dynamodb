const deleteItem = require('./delete');

const deleteBulk = (items) => {
  const promises = [];
  items.forEach((item) => {
    promises.push(deleteItem(item));
  });

  return Promise.all(promises);
};

module.exports = deleteBulk;
