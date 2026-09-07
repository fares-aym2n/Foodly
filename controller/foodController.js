const Food = require('../models/food');
const factory = require('./factoryController');

const getAllFood = async (req, res, next) => {
  const foods = await Food.find({}, { __v: false });

  res.status(200).json({
    resutls: foods.length,
    data: {
      foods,
    },
  });
};

const getAll=factory.getAll(Food);
const getOne=factory.getOne(Food)
const createOne = factory.createOne(Food);
const updateOne = factory.updateOne(Food);
const deleteOne = factory.deleteOne(Food);


module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
