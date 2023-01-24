const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const salesService = require("../../../src/services/salesServices");
const salesControllers = require("../../../src/controllers/salesControllers");
const salesList = require("../mocks/salesList.mock");

chai.use(sinonChai);
const { expect } = chai;

describe("Sales Controller", function () {
  describe("Get all sales", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });
    it("Check if it returns status 200 and all sales", async function () {
      sinon
        .stub(salesService, "getAllSales")
        .resolves({ type: null, message: salesList });

      await salesControllers.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(salesList);
    });
  });

  describe("Get sales by id", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Check if it returns status 404 and the not found message", async function () {
      req.params = { id: 7 };
      sinon
        .stub(salesService, "getSalesById")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      await salesControllers.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({
        message: "Sale not found",
      });
    });
    it("Check if it returns status 200 and the requested sale", async function () {
      req.params = { id: 2 };

      sinon
        .stub(salesService, "getSalesById")
        .resolves({ type: null, message: salesList[2] });

      await salesControllers.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(salesList[2]);
    });
  });
});
