const express = require('express');
const restaurantController = require('../controller/restaurantController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.use(verifyToken);

router
  .route('/top-5-rating')
  .get(
    restaurantController.getTop5Rating,
    restaurantController.getAll,
  );

router
  .route('/')
  .get(restaurantController.getAll)
  .post(allawedTo('admin'), restaurantController.createOne);

router
  .route('/:id')
  .get(restaurantController.getOne)
  .patch(allawedTo('admin'), restaurantController.updateOne)
  .delete(allawedTo('admin'), restaurantController.deleteOne);

module.exports = router;
