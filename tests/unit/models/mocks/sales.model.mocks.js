const salesMockFromDB = [
  {
    saleId: 1,
    date: "2022-09-13T23:19:14.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-09-13T23:19:14.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-09-13T23:19:14.000Z",
    productId: 3,
    quantity: 15,
  },
];

const salesIsNotFound = {
  saleId: 10,
  date: "2022-12-13T23:19:14.000Z",
  productId: 10,
  quantity: 25,
};

const salesMockReturn = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};


module.exports = {
  salesMockFromDB,
  salesMockReturn,
  salesIsNotFound,
};
