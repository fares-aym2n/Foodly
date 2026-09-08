const AppError = require('../utils/AppError.js');

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not authorized', 403));
    }

    next();
  };
};

module.exports = allowedTo;
