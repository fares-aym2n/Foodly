const Restaurant = require('../models/restaurant');
const factory = require('./factoryController');
// Alias Route
const getTop5Rating = async (req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: {
      ...req.query,
      limit: 5,
      sort: '-rating',
    },
    writable: true,
    configurable: true,
    enumerable: true,
  });

  next();
};

const getAllRestaurant = async (req, res, next) => {
  const features = new featursAPI(Restaurant.find(), req.query)
    .filter()
    .limit()
    .sort()
    .paginate();

  const resturants = await features.query;

  res.status(200).json({
    resutls: resturants.length,
    data: {
      resturants,
    },
  });
};

const getAll = factory.getAll(Restaurant);
const getOne = factory.getOne(Restaurant, {
  path: 'category',
  select: 'name',
});
const createOne = factory.createOne(Restaurant);
const updateOne = factory.updateOne(Restaurant);
const deleteOne = factory.deleteOne(Restaurant);

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  getTop5Rating,
  deleteOne,
};
