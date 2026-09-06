const User = require('../models/users');
const verifyToken = async (req, res, next) => {
  const jwt = require('jsonwebtoken');

  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : req.cookies.token;
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedData.id);
  req.user = user;
  next();
};
module.exports = verifyToken;
