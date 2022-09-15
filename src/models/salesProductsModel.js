const connection = require('./connection');

const createSales = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (NULL)',
  );
  const { insertId } = result;
  return insertId;
};

const createSalesProd = async (sales) => {
  const saleId = await createSales();
  const values = sales.map(({ productId, quantity }) => [
    saleId,
    productId,
    quantity,
  ]);

  const query = 'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES ?;';

  await connection.query(query, [values]);

  const result = {
    id: saleId,
    itemsSold: sales,
  };

  return result;
};

const getAllSalesProd = async () => {
  const [query] = await connection.execute(
  `SELECT sales.id AS saleId,
  sales.date AS date,
  sales_products.product_id AS productId,
  sales_products.quantity AS quantity
  FROM StoreManager.sales AS sales
  JOIN StoreManager.sales_products AS
  sales_products ON sales_products.sale_id = sales.id;`,
);
  return query;
};

const getByIdSalesProd = async (id) => {
  const [query] = await connection.execute(
    `SELECT sales.date AS date,
  sales_products.product_id AS productId,
  sales_products.quantity AS quantity
  FROM StoreManager.sales AS sales
  JOIN StoreManager.sales_products AS
  sales_products ON sales_products.sale_id = sales.id
  WHERE sales.id = ?;`, [id],
);

  return query;
};

 const deleteByIdSales = async (id) => {
   await connection.execute(`
    DELETE StoreManager.sales, StoreManager.sales_products
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    WHERE StoreManager.sales.id = 1;`,
     [id]);
 };

const updateByIdSales = async (saleId, productId, quantity) => {
  const params = [quantity, saleId, productId];
  await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ?
    AND product_id = ?;
  `,
     params,
);
};

module.exports = {
  getByIdSalesProd,
  getAllSalesProd,
  createSalesProd,
  createSales,
  deleteByIdSales,
  updateByIdSales,
};
