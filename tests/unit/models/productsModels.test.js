const chai = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { connection } = require("../../../src/models/connection");
const listProducts = require("./mocks/listProducts.model.mock");

const { expect } = chai;

describe("products Model", function () {
  describe("Get all products", function () {
    it("Check if it returns all products in the list", async function () {
      afterEach(() => {
        sinon.restore();
      });
      sinon.stub(connection, "execute").resolves(listProducts);

      const result = await productsModel.getAllProducts();

      expect(result).to.be.deep.equal([listProducts]);
    });
  });

  describe("List products by id", function () {
    it("Check if the requested product is returned ", async function () {
        afterEach(() => {
          sinon.restore();
        });
      sinon.stub(connection, "execute").resolves([[listProducts[0]]]);

      const result = await productsModel.getProductsById(1);

      expect(result).to.be.deep.equal(listProducts[0]);
    });
  });
});
