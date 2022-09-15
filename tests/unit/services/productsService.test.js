const sinon = require("sinon");
const { expect } = require("chai");

const {
  productsMockFromDB,
  productById,
  newProduct,
} = require("../models/mocks/products.model.mocks");
const { productsModel } = require("../../../src/models");

const { productsService } = require("../../../src/services");

describe("TEST SERVICE PRODUCTS", () => {
  describe("Testa quando tem produtos no banco ", () => {
    it("Testa a busca por todos os produtos no banco", async () => {
      sinon.stub(productsModel, "getAllProd").resolves(productsMockFromDB);
      const result = await productsService.getAllService();
      expect(result).to.deep.equal(productsMockFromDB);
    });
    it("Testa a busca por um produto no banco", async () => {
      sinon.stub(productsModel, "getByIdProd").resolves(productById);
      const result = await productsService.getByIdService(2);
      expect(result).to.deep.equal(productById);
    });
    it("Testa a inserção de um produto no banco", async () => {
      sinon.stub(productsModel, "createProd").resolves({insertId: 4});
      const result = await productsService.createService(
        "Armadura do Homem de Ferro"
      );
      expect(result).to.deep.equal(newProduct);
    });
    afterEach(sinon.restore);
  });
});
