const productsModel = require('../models/productsModel');
const { validateId } = require('./validation/validationInput');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return { type: null, message: allProducts };
};

const getProductById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getProductsById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (product) => {
  const newProductId = await productsModel.insertProduct(product);
  const newProduct = await productsModel.getProductsById(newProductId);
  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};
