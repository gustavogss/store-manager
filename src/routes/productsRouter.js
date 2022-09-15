const express = require('express');
const { productsController } = require('../controllers');
const {
  productNameValidation,
  productNameLength,
} = require('../middlewares/productValidated');

const router = express.Router();

router.get('/search', productsController.searchController);
router.get('/', productsController.getAllController);
router.get('/:id', productsController.getByIdController);
router.post(
  '/',
  productNameValidation,
  productNameLength,
  productsController.createController,
);
router.put(
  '/:id',
  productNameValidation,
  productNameLength,
  productsController.updateController,
);
router.delete('/:id', productsController.deleteByIdController);

module.exports = router;
