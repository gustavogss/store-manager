const sinon = require("sinon");
const { expect } = require("chai");
const  connection  = require("../../../src/models/connection");

const {
  productsMockFromDB,
  productById,
  newProduct
} = require("./mocks/products.model.mocks");

const { productsModel } = require("../../../src/models");

describe("TEST MODEL PRODUCTS", () => {
  describe("Testa quando tem produtos no banco ", () => {
    it("Testa a busca por todos os produtos no banco", async () => {
      sinon.stub(connection, "execute").resolves([productsMockFromDB]);
      const result = await productsModel.getAllProd();
      expect(result).to.deep.equal(productsMockFromDB);
    });
    it("Testa a busca por um produto no banco", async () => {
      sinon.stub(connection, "execute").resolves([[productsMockFromDB[0]]]);
      const result = await productsModel.getByIdProd(1);
      expect(result).to.deep.equal(productsMockFromDB[0]);
    });
    it("Testa a inserção de um produto no banco", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
      const result = await productsModel.createProd("Armadura do Homem de Ferro");
     expect(result).to.be.deep.equal({ insertId: 4 });
    });
    afterEach(sinon.restore);
  });
});
