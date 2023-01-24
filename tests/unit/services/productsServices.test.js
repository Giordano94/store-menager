const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const productsModel = require("../../../src/models/productsModel");
const productsService = require("../../../src/services/productsService");
const listProducts = require("../mocks/listProducts.mock");

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

      expect(result).to.be.deep.equal({ type: null, message: listProducts });
    });
  });

  describe("Get products by id", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Check if the requested product is returned   ", async function () {
      const requestedProduct = [
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];

      sinon.stub(productsModel, "getProductsById").resolves(requestedProduct);

      const result = await productsService.getProductById(3);

      expect(result).to.be.deep.equal({
        type: null,
        message: requestedProduct,
      });
    });

    it("Check that the ordered product has not been returned  ", async function () {
      const errorMessage = "Product not found";
      const errorType = "PRODUCT_NOT_FOUND";

      sinon.stub(productsModel, "getProductsById").resolves();

      const result = await productsService.getProductById(123);

      expect(result).to.be.deep.equal({
        type: errorType,
        message: errorMessage,
      });
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

      const newId = 5;

      sinon.stub(productsModel, "insertProduct").resolves(newProduct);
      sinon.stub(productsModel, "getProductsById").resolves(5);

      const result = await productsService.insertProduct(newProduct);

      expect(result).to.be.deep.equal({ type: null, message: newId });
    });
  });

  /*
describe("Update product", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if return error message if product not exists  ", async function () {
      const updatedProduct = {
        name: "Super man",
      };

      sinon.stub(productsModel, "getProductById").resolves(undefined);

      const result = await productsService.updateProduct(undefined);

      expect(result).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if return the update product  ", async function () {
      const updatedProduct = {
        name: "Super man",
      };

      const updateId = 3;


      sinon
        .stub(productsModel, "updateProduct")
        .resolves( updateId, updatedProduct );

      const result = await productsService.updateProduct(
        updatedProduct,
        Number(updateId)
      );

      expect(result).to.be.deep.equal({
        type: null,
        message: updatedProduct,
      });
    });
  });


  describe("Remove product", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if remove product   ", async function () {
      sinon.stub(productsModel, "removeProduct").resolves();

      const result = await productsService.removeProduct(2);

      expect(result).to.be.deep.equal({
        type: null,
        message: "",
      });
    });
  });

  */
});
