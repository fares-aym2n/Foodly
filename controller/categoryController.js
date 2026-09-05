const Category = require('../models/category');

const AppError = require('../utils/AppError');

const getAllCategory = async (req, res, next) => {
  const category = await Category.find({}, { __v: false });

  res.status(200).json({
    resutls: category.length,
    data: {
      category,
    },
  });
};

const getCategory = async (req, res, next) => {
  const category = await Category.findById(
    req.params.id,
  ).populate({
    path:"food",
    select:"name price rating"
  });

  if (!category) {
    return next(
      new AppError('No category found with this ID', 404),
    );
  }

  return res.status(200).json({
    data: category,
  });
};

const createCategory = async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  return res.status(201).json({
    data: newCategory,
  });
};

const updateCategory = async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (!category) {
    return next(
      new AppError('No category found with this ID', 404),
    );
  }

  return res.status(200).json({
    data: category,
  });
};

const deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(
    req.params.id,
    {
      runValidators: true,
    },
  );

  if (!category) {
    return next(
      new AppError('No category found with this ID', 404),
    );
  }

  return res.status(204).json();
};

module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
