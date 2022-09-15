const { productsService } = require('../services');

const getAllController = async (_req, res) => {
  const data = await productsService.getAllService();
  return res.status(200).json(data);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await productsService.getByIdService(id);
  if (!data) res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(data);
};
const createController = async (req, res) => {
  const { name } = req.body;
  const response = await productsService.createService(name);
  res.status(201).json(response);
};

const updateController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateService(id, name);

  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(result);
};

const deleteByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteByIdService(id);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

const searchController = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.searchService(q);
  res.status(200).json(message);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteByIdController,
  searchController,
};
