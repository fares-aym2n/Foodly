const express = require('express');
const foodController = require('../controller/foodController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
router
  .route('/')
  .get(foodController.getAll)
  .post(
    verifyToken,
    allawedTo('admin'),
    foodController.createOne,
  );
router
  .route('/:id')
  .get(foodController.getOne)
  .patch(
    verifyToken,
    allawedTo('admin'),
    foodController.updateOne,
  )
  .delete(
    verifyToken,
    allawedTo('admin'),
    foodController.deleteOne,
  );

module.exports = router;
