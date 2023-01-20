const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const productsModel = require("../../../src/models/productsModel");
const productsService = require("../../../src/services/productsService");
const listProducts = require("./mocks/listProducts.model.mock");

chai.use(sinonChai);
const { expect } = chai;

describe("products Service", function () {
  describe("Get all products", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if it returns all products in the list", async function () {
      sinon.stub(productsModel, "getAllProducts").resolves(listProducts);

      const result = await productsService.getAllProducts();

      expect(result.type).to.be.equal(null);
      expect(result).to.be.deep.equal(listProducts);
    });
  });

  describe("Get products by id", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Check if the requested product is returned   ", async function () {
      sinon
        .stub(productsModel, "getProductsById")
        .resolves([[listProducts[0]]]);

      const result = await productsService.getProductsById(1);

      expect(result.type).to.be.equal(null);
      expect(result).to.be.deep.equal(listProducts[0]);
    });

    it("Check if the id is valid  ", async function () {
      const errorMessage = '"id" must be a number';
      const errorType = "INVALID_VALUE";

      sinon.stub(productsModel, "getProductsById").resolves("0");

      const result = await productsService.getProductsById("0");

      expect(result.type).to.be.equal(errorType);
      expect(result.message).to.be.deep.equal(errorMessage);
    });

    it("Check that the ordered product has not been returned  ", async function () {
      const errorMessage = "Product not found";
      const errorType = "PRODUCT_NOT_FOUND";

      sinon.stub(productsModel, "getProductsById").resolves();

      const result = await productsService.getProductsById(123);

      expect(result.type).to.be.equal(errorType);
      expect(result.message).to.be.deep.equal(errorMessage);
    });
  });

  describe("Create a new product", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if return the new product  ", async function () {
      const newProduct = {
        name: "Armor Iron man",
      };

      sinon.stub(productsModel, "insertProduct").resolves(1);
      sinon.stub(productsModel, "getProductsById").resolves(listProducts[0]);

      const result = await productsService.insertProduct(newProduct);

      expect(result.type).to.be.equal(null);
      expect(result).to.be.deep.equal(listProducts[0]);
    });
  });

  describe("Update product", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if return the product updated  ", async function () {
      const updatedProduct = {
        id: 5,
        name: "Super man",
      };

      sinon.stub(productsModel, "updateProduct").resolves(updatedProduct);

      const result = await productsService.updateProduct(updatedProduct);

      expect(result.type).to.be.equal(null);
      expect(result).to.be.deep.equal(updatedProduct);
    });
  });
});
