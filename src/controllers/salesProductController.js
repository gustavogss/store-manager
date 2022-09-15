const { salesProductService } = require('../services');

const createSalesController = async (req, res) => {
  const sales = req.body;
  const result = await salesProductService.createSalesProdService(sales);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  } return res.status(201).json(result);
};

const getAllSalesController = async (_req, res) => {
  const sales = await salesProductService.getAllSalesProdService();
  return res.status(200).json(sales);
};

const getByIdSalesController = async (req, res) => {
  const { id } = req.params;
  const sales = await salesProductService.getByIdSalesProdService(id);

  if (sales.message) {
    return res.status(404).json({ message: sales.message });
  }
  res.status(200).json(sales);
};

const deleteSalesController = async (req, res) => {
   const { id } = req.params;
   const sale = await salesProductService.deleteSalesProdService(id);

   if (!sale) return res.status(404).json({ message: 'Sale not found' });
   return res.status(204).end();
};

const updateByIdSalesController = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const result = await salesProductService.updateByIdSalesProdService(id, sales);
  if (result.error) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result);
};

module.exports = {
  getAllSalesController,
  getByIdSalesController,
  createSalesController,
  deleteSalesController,
  updateByIdSalesController,
};
