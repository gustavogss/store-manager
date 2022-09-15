const express = require('express');
 const {
   quantityValidation,
   requiredFields,
 } = require('../middlewares/salesValidated');
const { salesProductController } = require('../controllers');

const router = express.Router();

router.get('/', salesProductController.getAllSalesController);
router.get('/:id', salesProductController.getByIdSalesController);
router.delete('/:id', salesProductController.deleteSalesController);
router.post(
  '/',
  requiredFields,
  quantityValidation,
  salesProductController.createSalesController,
);

router.put(
  '/:id',
  requiredFields,
  quantityValidation,
  salesProductController.updateByIdSalesController,
);

module.exports = router;
