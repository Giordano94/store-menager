const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return allProducts;
};

module.exports = {
  getAllProducts,
};
