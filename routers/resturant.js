const express = require('express');
const restaurantController = require('../controller/restaurantController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router
  .route('/top-5-rating')
  .get(
    restaurantController.getTop5Rating,
    restaurantController.getAll,
  );

router
  .route('/')
  .get(restaurantController.getAll)
  .post(
    verifyToken,
    allawedTo('admin'),
    restaurantController.createOne,
  );

router
  .route('/:id')
  .get(restaurantController.getOne)
  .patch(
    verifyToken,
    allawedTo('admin'),
    restaurantController.updateOne,
  )
  .delete(
    verifyToken,
    allawedTo('admin'),
    restaurantController.deleteOne,
  );

module.exports = router;
