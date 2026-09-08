const Category = require('../models/category');
const factory = require('./factoryController');

const getAll = factory.getAll(Category);
const getOne = factory.getOne(Category, {
  path: 'food',
  select: 'name price rating',
});
const createOne = factory.createOne(Category);
const updateOne = factory.updateOne(Category);
const deleteOne = factory.deleteOne(Category);

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
