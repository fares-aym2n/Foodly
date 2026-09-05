const Food = require('../models/food');

const AppError = require('../utils/AppError');

const getAllFood = async (req, res, next) => {
  const foods = await Food.find({}, { __v: false });

  res.status(200).json({
    resutls: foods.length,
    data: {
      foods,
    },
  });
};

const getFood = async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return next(new AppError('No food found with this ID', 404));
  }

  return res.status(200).json({
    data: food,
  });
};

const createFood = async (req, res, next) => {
  const newFood = await Food.create(req.body);

  return res.status(201).json({
    data: newFood,
  });
};

const updateFood = async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (!food) {
    return next(new AppError('No food found with this ID', 404));
  }

  return res.status(200).json({
    data: food,
  });
};

const deleteFood = async (req, res, next) => {
  const food = await Food.findByIdAndDelete(req.params.id, {
    runValidators: true,
  });

  if (!food) {
    return next(new AppError('No food found with this ID', 404));
  }

  return res.status(204).json();
};

module.exports = {
  getAllFood,
  getFood,
  createFood,
  updateFood,
  deleteFood,
};
