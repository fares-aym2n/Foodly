const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const restaurantRouter = require('./routers/resturant');
const categoryRouter = require('./routers/category');
const foodRouter = require('./routers/food');
const userRouter = require('./routers/user');
const errorController = require('./controller/errorController');
const AppError = require('./utils/AppError');
const app = express();
app.set('query parser', 'extended');
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
    new AppError(`Route not found: ${req.originalUrl}`),
  );
});

app.use(errorController);

module.exports = app;
