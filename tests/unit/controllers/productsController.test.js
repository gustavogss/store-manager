const sinon = require("sinon");

const {
  productsMockFromDB,
  productById,
  newProduct,
} = require("../models/mocks/products.model.mocks");

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");

describe("TEST CONTROLLER PRODUCTS", () => {
  describe("Testa quando tem produtos no banco ", () => {
    it("Testa a busca por todos os produtos no banco", async () => {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getAllService").resolves(productsMockFromDB);
      const result = await productsController.getAllController(req, res);
       sinon.assert.calledWith(res.status, 200);
       sinon.assert.calledWith(res.json, productsMockFromDB);

    });
    it("Testa a busca por um produto no banco", async () => {
       const res = {};
       const req = { params: { id: 2 }, body: {} };
       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
      sinon.stub(productsService, "getByIdService").resolves(productById);
      const result = await productsController.getByIdController(req, res);
     sinon.assert.calledWith(res.status, 200);
     sinon.assert.calledWith(res.json, productById);
    });
    it("Testa a inserção de um produto no banco", async () => {
       const res = {};
       const req = { body: { name: "Armadura do Homem de Ferro" } };
       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
      sinon.stub(productsService, "createService").resolves(newProduct);
      const result = await productsController.createController(req, res);
      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, newProduct);
    });
    it("Testa quando o produto não for encontrado", async () => {
        const res = {};
        const req = { params: { id: 11111 }, body:{} };
       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
      sinon.stub(productsService, "getAllService").throws("Product not found");
      const result = await productsController.getByIdController(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json);
  });
    });
    afterEach(sinon.restore);
  });

