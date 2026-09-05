const express = require('express');
const foodController = require('../controller/foodController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
router.use(verifyToken);
router
  .route('/')
  .get(foodController.getAllFood)
  .post(allawedTo('admin'), foodController.createFood);
router
  .route('/:id')
  .get(foodController.getFood)
  .patch(allawedTo('admin'), foodController.updateFood)
  .delete(allawedTo('admin'), foodController.deleteFood);

module.exports = router;
