const Restaurant = require('../models/restaurant');

const AppError = require('../utils/AppError');

const getAllRestaurant = async (req, res, next) => {
  const resturants = await Restaurant.find({}, { __v: false });

  res.status(200).json({
    resutls: resturants.length,
    data: {
      resturants,
    },
  });
};

const getRestaurnat = async (req, res, next) => {
  const resturant = await Restaurant.findById(
    req.params.id,
  ).populate({ path: 'category', select: 'name' });

  if (!resturant) {
    return next(
      new AppError('No restaurant found with this ID', 404),
    );
  }

  return res.status(200).json({
    data: resturant,
  });
};

const createRestaurnt = async (req, res, next) => {
  const newRestaurant = await Restaurant.create(req.body);

  return res.status(201).json({
    data: newRestaurant,
  });
};

const updateResturant = async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (!restaurant) {
    return next(
      new AppError('No restaurant found with this ID', 404),
    );
  }

  return res.status(200).json({
    data: restaurant,
  });
};

const deleteResturant = async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndDelete(
    req.params.id,
    {
      runValidators: true,
    },
  );

  if (!restaurant) {
    return next(
      new AppError('No restaurant found with this ID', 404),
    );
  }

  return res.status(204).json();
};

module.exports = {
  getAllRestaurant,
  getRestaurnat,
  createRestaurnt,
  updateResturant,
  deleteResturant,
};
