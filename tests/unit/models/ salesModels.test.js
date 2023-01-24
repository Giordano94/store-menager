const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { connection } = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModels");
const salesList = require("../mocks/salesList.mock");

chai.use(sinonChai);
const { expect } = chai;

describe("Sales Model", function () {
  describe("Get all sales", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if it returns all sales", async function () {
      sinon.stub(connection, "execute").resolves([salesList]);

      const result = await salesModel.getAllSales();

      expect(result).to.be.deep.equal(salesList);
    });
  });

  describe("Get sales by id", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Check if the requested sale is returned ", async function () {
      const saleId = 2;

      const requestedSale = [
        {
          date: "2023-01-22T19:52:14.000Z",
          product_id: 3,
          quantity: 15,
        },
      ];

      sinon.stub(connection, "execute").resolves([requestedSale]);

      const result = await salesModel.getSalesById(saleId);

      expect(result).to.be.deep.equal(requestedSale);
    });
  });
});
