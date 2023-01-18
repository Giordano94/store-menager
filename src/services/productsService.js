const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return { type: null, message: allProducts };
};

module.exports = {
  getAllProducts,
};