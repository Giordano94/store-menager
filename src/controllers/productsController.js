const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();
  res.status(200).json(allProducts);
};

module.exports = {
  getAllProducts,
};
