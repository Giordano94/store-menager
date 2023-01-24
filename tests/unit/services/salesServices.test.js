const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const salesService = require("../../../src/services/salesServices");
const salesModel = require("../../../src/models/salesModels");
const salesList = require("../mocks/salesList.mock");

chai.use(sinonChai);
const { expect } = chai;

describe("Sales Service", function () {
  describe("Get all sales", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("Check if it returns all sales", async function () {
      sinon.stub(salesModel, "getAllSales").resolves(salesList);

      const result = await salesService.getAllSales();

      expect(result).to.be.deep.equal({ type: null, message: salesList });
    });
  });

  describe("Get sales by id", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Check that the ordered sale has not been returned ", async function () {

      sinon.stub(salesModel, "getSalesById").resolves(undefined);

      const result = await salesService.getSalesById(undefined);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '\"id\" must be a number',
      });
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

      sinon.stub(salesModel, "getSalesById").resolves(requestedSale);

      const result = await salesService.getSalesById(saleId);

      expect(result).to.be.deep.equal({ type: null, message: requestedSale });
    });
  });
});
