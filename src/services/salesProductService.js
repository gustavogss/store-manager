const { salesProductModel } = require('../models');
const { productsModel } = require('../models');

const inventory = async (sales) => {
  const result = sales.reduce((acc, { productId }) => {
    const product = productsModel.getByIdProd(productId);
    return [...acc, product];
  }, []);

  const products = await Promise.all(result);
  const isIdInvalid = products.some((product) => !product);
  return isIdInvalid;
};

const createSalesProdService = async (sales) => {
  const isIdInvalid = await inventory(sales);
  if (isIdInvalid) return false;
  const result = await salesProductModel.createSalesProd(sales);
  return result;
};

const getAllSalesProdService = async () => {
  const sales = await salesProductModel.getAllSalesProd();
  return sales;
};

const getByIdSalesProdService = async (id) => {
  const sales = await salesProductModel.getByIdSalesProd(id);
if (sales.length <= 0 || !sales) return { status: 404, message: 'Sale not found' };
return sales;
};

const deleteSalesProdService = async (id) => {
  const sale = await salesProductModel.getByIdSalesProd(id);
  if (sale.length === 0) return false;
  await salesProductModel.deleteByIdSales(id);
  return true;
};

const updateByIdSalesProdService = async (saleId, sales) => {
  const sale = await salesProductModel.getByIdSalesProd(saleId);

  if (sale.length === 0) return { error: true, message: 'Sale not found' };

  const invalidId = await inventory(sales);
  if (invalidId) return { error: true, message: 'Product not found' };

  const update = sales.reduce((acc, { productId, quantity }) => {
    const updatedSale = salesProductModel.updateByIdSales(
      saleId,
      productId,
      quantity,
    );
    return [...acc, updatedSale];
  }, []);

  await Promise.all(update);

  const updatedItems = {
    saleId,
    itemsUpdated: sales,
  };
  return updatedItems;
};

module.exports = {
  getAllSalesProdService,
  getByIdSalesProdService,
  createSalesProdService,
  deleteSalesProdService,
  updateByIdSalesProdService,
};
