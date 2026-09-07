const express = require('express');
const foodController = require('../controller/foodController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
router.use(verifyToken);
router
  .route('/')
  .get(foodController.getAll)
  .post(allawedTo('admin'), foodController.createOne);
router
  .route('/:id')
  .get(foodController.getOne)
  .patch(allawedTo('admin'), foodController.updateOne)
  .delete(allawedTo('admin'), foodController.deleteOne);

module.exports = router;
