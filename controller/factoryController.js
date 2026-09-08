const AppError = require('../utils/AppError.js');
const featursAPI = require('../utils/featuresAPI');

const getAll = (Model) => {
  return async (req, res, next) => {
    const features = new featursAPI(Model.find(), req.query)
      .filter()
      .limit()
      .sort()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      resutls: doc.length,
      data: {
        status: 'success',
        doc,
      },
    });
  };
};

const getOne = (Model, Populate) => {
  return async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (Populate) {
      query = query.populate(Populate);
    }
    const doc = await query;

    if (!doc) {
      return next(
        new AppError('No document found with that ID', 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  };
};

const createOne = (Model) => {
  return async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  };
};

const updateOne = (Model) => {
  return async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!doc) {
      return next(
        new AppError('No document found with that ID', 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  };
};

const deleteOne = (Model) => {
  return async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id, {
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError('No document found with that ID', 404),
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
