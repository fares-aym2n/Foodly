const Restaurant = require('../models/restaurant');

const AppError = require('../utils/AppError');

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
  // 1)Filtering
  const queryObj = {...req.query};
  console.log(queryObj)

  const execludeField = ['sort', 'page', 'limit', 'fields'];

  execludeField.forEach((el) => delete queryObj[el]);

  if (req.query.address) {
    const address = req.query.address;

    queryObj.address = {
      $regex: `${address}`,
      $options: 'i',
    };
  }

  // 2)Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`,
  );

  let query = Restaurant.find(JSON.parse(queryStr), {});

  // 3)Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort;
    query = query.sort(sortBy);
  }

  // 4)Filtering Fields
  if (req.query.fields) {
    const limitedField = req.query.fields.split(',').join(' ');
    query = query.select(limitedField);
  } else {
    query = query.select('-createdAt -updatedAt -__v');
  }

  // 5)Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query.limit(limit).skip(skip);
  if (req.query.page) {
    const docCount = await Restaurant.countDocuments();
    if (skip >= docCount) {
      return next(new AppError('Page is not found', 404));
    }
  }

  const resturants = await query;

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
  getTop5Rating,
};
