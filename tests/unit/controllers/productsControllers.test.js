const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const productsService = require("../../../src/services/productsService");
const productsController = require("../../../src/controllers/productsController");
const listProducts = require("./mocks/listProducts.model.mock");

chai.use(sinonChai);
const { expect } = chai;

describe("products Controller", function () {
  describe("Get all products", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if it returns status 200 and all products", async function () {
      sinon.stub(productsService, "getAllProducts").resolves(listProducts);

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.status).to.have.been.calledWithExactly(listProducts);
    });
  });

  describe("Get products by id", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if it returns status 200 and the requested product", async function () {
      sinon.stub(productsService, "getProductById").resolves(listProducts[0]);

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.status).to.have.been.calledWithExactly(listProducts[0]);
    });

    it("Check if it returns status 404 and message 'Product not found'", async function () {
      req.params = { id: 321 };

      sinon.stub(productsService, "getProductById").resolves();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.status).to.have.been.calledWithExactly({
        message: "Product not found",
      });
    });
  });

  describe("Insert products ", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if it returns status 201 and the new product", async function () {
      req.body = {
        name: "Batmóvel",
      };

      const newProduct = { id: 5, ...req.body };

      sinon.stub(productsService, "insertProduct").resolves(newProduct);

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.status).to.have.been.calledWithExactly(newProduct);
    });
  });
});
