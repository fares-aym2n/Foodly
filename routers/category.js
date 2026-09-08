const app = require('express');
const categoryController = require('../controller/categoryController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = app.Router();
router
  .route('/')
  .get(categoryController.getAll)
  .post(
    verifyToken,
    allawedTo('admin'),
    categoryController.createOne,
  );
router
  .route('/:id')
  .get(categoryController.getOne)
  .patch(
    verifyToken,
    allawedTo('admin'),
    categoryController.updateOne,
  )
  .delete(
    verifyToken,
    allawedTo('admin'),
    categoryController.deleteOne,
  );

module.exports = router;
