const User = require('../models/users');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRED,
    },
  );
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('The email is already exist', 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: req.file.filename,
  });
  const token = generateToken(user);
  res.status(201).json({
    data: user,
    token,
  });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new AppError('Incorrect email or password', 400),
    );
  }

  const correctPassword = await user.ComparePassword(password);

  if (!correctPassword) {
    return next(
      new AppError('Incorrect email or password', 400),
    );
  }
  const token = generateToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({
    token,
  });
};

const logOut = async (req, res, next) => {
  res.clearCookie('token').json({
    status: 'success',
    message: 'You Logged out!',
  });
};

const getMe = async (req, res, next) => {
  const me = await User.findById(req.user._id);
  res.status(200).json({
    status: 'success',
    data: me,
  });
};

module.exports = {
  register,
  login,
  logOut,
  getMe,
};
