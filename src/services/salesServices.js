const salesModels = require('../models/salesModels');
const { validateId } = require('./validation/validationInput');

const getAllSales = async () => {
  const allSales = await salesModels.getAllSales();
  return { type: null, message: allSales };
};

const getSalesById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) return error;

  const sale = await salesModels.getSalesById(saleId);
  console.log('saleId', saleId);
  console.log('sale', sale);
  if (sale.length !== 0) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};
module.exports = {
  getAllSales,
  getSalesById,
};
