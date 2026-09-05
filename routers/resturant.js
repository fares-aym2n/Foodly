const express = require('express');
const restaurantController = require('../controller/restaurantController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.use(verifyToken);

router
  .route('/')
  .get(restaurantController.getAllRestaurant)
  .post(
    allawedTo('admin'),
    restaurantController.createRestaurnt,
  );
router
  .route('/:id')
  .get(restaurantController.getRestaurnat)
  .patch(
    allawedTo('admin'),
    restaurantController.updateResturant,
  )
  .delete(
    allawedTo('admin'),
    restaurantController.deleteResturant,
  );

module.exports = router;
