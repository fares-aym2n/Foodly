const app = require('express');
const categoryController = require('../controller/categoryController');
const allawedTo = require('../middleware/allawedTo');
const verifyToken = require('../middleware/verifyToken');
const router = app.Router();
router.use(verifyToken);
router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(allawedTo('admin'), categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(allawedTo('admin'), categoryController.updateCategory)
  .delete(allawedTo('admin'), categoryController.deleteCategory);

module.exports = router;
