const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const restaurantRouter = require('./routers/resturant');
const categoryRouter = require('./routers/category');
const foodRouter = require('./routers/food');
const userRouter = require('./routers/user');
const errorController = require('./controller/errorController');
const AppError = require('./utils/AppError');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 2,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (req, res, next, options) => {
    next(
      new AppError(
        'Too many requests. Please try again later.',
        options.statusCode,
      ),
    );
  },
});

const app = express();
app.set('query parser', 'extended');
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads')),
);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/category', categoryRouter);
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);

app.use('/', (req, res, next) => {
  return next(
    new AppError(
      `Can't not found ${req.originalUrl} on the server`,
    ),
  );
});

app.use(errorController);

module.exports = app;

