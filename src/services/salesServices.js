const salesModels = require('../models/salesModels');
const { validateId } = require('./validation/validationInput');

const getAllSales = async () => {
  const allSales = await salesModels.getAllSales();
  return { type: null, message: allSales };
};

const getSalesById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) return error;

  const product = await salesModels.getSalesById(saleId);
  if (product) return { type: null, message: product };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};
module.exports = {
  getAllSales,
  getSalesById,
};
