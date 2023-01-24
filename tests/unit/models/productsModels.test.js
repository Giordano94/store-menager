const chai = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { connection } = require("../../../src/models/connection");
const listProducts = require("../mocks/listProducts.mock");

const { expect } = chai;

describe("products Model", function () {
  describe("Get all products", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if it returns all products in the list", async function () {
      sinon.stub(connection, "execute").resolves([listProducts]);

      const result = await productsModel.getAllProducts();

      expect(result).to.be.deep.equal(listProducts);
    });
  });

  describe("List products by id", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if the requested product is returned ", async function () {
      sinon.stub(connection, "execute").resolves([[listProducts[0]]]);

      const result = await productsModel.getProductsById(1);

      expect(result).to.be.deep.equal(listProducts[0]);
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

      sinon.stub(connection, "execute").resolves([{ insertId: 5 }]);

      const result = await productsModel.insertProduct(newProduct);

      expect(result).to.be.deep.equal(5);
    });
  });

  describe("Update product", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if return the product updated  ", async function () {
      const productId = 1;
      const updatedProduct = "updatedProduct";

      sinon.stub(connection, "execute").resolves([{ changedRows: 1 }]);

      const result = await productsModel.updateProduct(
        updatedProduct,
        productId
      );

      expect(result).to.be.deep.equal({ id: 1, name: "updatedProduct" });
    });
  });

  describe("Remove products", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if remove product", async function () {
      sinon.stub(connection, "execute").resolves(3);

      const result = await productsModel.removeProduct(3);

      expect(result).to.be.deep.equal();
    });
  });
});
