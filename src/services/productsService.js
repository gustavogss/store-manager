const { productsModel } = require('../models');

const getAllService = async () => {
  const products = await productsModel.getAllProd();
  return products;
};

const getByIdService = async (id) => {
  const product = await productsModel.getByIdProd(id);
  return product;
};

const createService = async (product) => {
  const { insertId } = await productsModel.createProd(product);
  return { id: insertId, name: product };
};

const updateService = async (id, name) => {
  const productId = await getByIdService(id);
  if (!productId) return false;
  const result = await productsModel.updateProd(id, name);
  return result;
};

const deleteByIdService = async (id) => {
  const productId = await getByIdService(id);
  if (!productId) return false;
  await productsModel.deleteByIdProd(id);
  return true;
};

const searchService = async (name) => {
  if (!name) {
    const result = await productsModel.getAllProd();
    return { type: null, message: result };
  }

  const result = await productsModel.searchByIdProd(name);
  return { type: null, message: result };
};

module.exports = {
  getAllService,
  getByIdService,
  createService,
  updateService,
  deleteByIdService,
  searchService,
};
