const app = require('express');
const categoryController = require('../controller/categoryController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = app.Router();
router.use(verifyToken);
router
  .route('/')
  .get(categoryController.getAll)
  .post(allawedTo('admin'), categoryController.createOne);
router
  .route('/:id')
  .get(categoryController.getOne)
  .patch(allawedTo('admin'), categoryController.updateOne)
  .delete(allawedTo('admin'), categoryController.deleteOne);

module.exports = router;
