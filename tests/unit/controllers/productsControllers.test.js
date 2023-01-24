const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const productsService = require("../../../src/services/productsService");
const productsController = require("../../../src/controllers/productsController");
const listProducts = require("../mocks/listProducts.mock");

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
      sinon.stub(productsService, "getAllProducts").resolves({
        type: null,
        message: listProducts,
      });

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(listProducts);
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
      req.params = { id: 2 };

      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: null, message: listProducts[1] });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(listProducts[1]);
    });

    it("Check if it returns status 404 and message 'Product not found'", async function () {
      req.params = { id: 7 };
      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({
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

      const newProduct = { ...req.body };

      sinon
        .stub(productsService, "insertProduct")
        .resolves({ type: null, message: newProduct });
      sinon.stub(productsService, "getProductById").resolves(5);

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWithExactly(newProduct);
    });
  });

  describe("Update products ", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if it returns status 200 and the update product", async function () {
      req.params = { id: 2 };
      req.body = {
        name: "Shield",
      };

      const updatedProduct = { ...req.body };
      const updatedId = { ...req.params };

      sinon
        .stub(productsService, "updateProduct")
        .resolves({ type: null, message: updatedProduct });
      sinon.stub(productsService, "getProductById").resolves(updatedId);
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(updatedProduct);
    });
  });

  describe("Remove products ", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if it returns status 204 and remove product", async function () {
      req.params = { id: 2 };
      const removeId = { ...req.params };

      sinon.stub(productsService, "getProductById").resolves(removeId);
      sinon.stub(productsService, "removeProduct").resolves(removeId);

      await productsController.removeProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });
});
