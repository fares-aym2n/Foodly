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
const { router: docsRouter, swaggerDocument } = require('./docs/docs');
const errorController = require('./controller/errorController');
const AppError = require('./utils/AppError');
const app = express();

app.set('trust proxy', 1);
app.set('query parser', 'extended');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  skip: (req) => req.originalUrl.startsWith('/api-docs'),
  handler: (req, res, next, options) => {
    next(
      new AppError(
        'Too many requests. Please try again later.',
        options.statusCode,
      ),
    );
  },
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://cdnjs.cloudflare.com',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cdnjs.cloudflare.com',
          'https://fonts.googleapis.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://validator.swagger.io',
          'https://swagger.io',
        ],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      },
    },
  }),
);
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads')),
);

// API Documentation routes
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});
app.use('/api-docs', docsRouter);

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

