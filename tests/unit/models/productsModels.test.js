const chai = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { connection } = require("../../../src/models/connection");
const listProducts = require("./mocks/listProducts.model.mock");

const { expect } = chai;

describe("products Model", function () {
  describe("products Model", function () {
    it("Test if it returns all products in the list", async function () {
      sinon.stub(connection, "execute").resolves(listProducts);

      const result = await productsModel.getAllProducts();

      expect(result).to.be.deep.equal([listProducts]);
    });
  });
});
