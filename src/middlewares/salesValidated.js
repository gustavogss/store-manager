const {
  validateQuantity,
  validateProducts,
} = require('../schemas/salesSchema');

const quantityValidation = (req, res, next) => {
  const sales = req.body;

  const { error } = validateQuantity.validate(sales);

  if (error) {
    console.log(error);
    return res
      .status(422).json({ message: error.message });
  }

  next();
};

const requiredFields = (req, res, next) => {
  const sales = req.body;

  const { error } = validateProducts.validate(sales);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  quantityValidation,
  requiredFields,
};
