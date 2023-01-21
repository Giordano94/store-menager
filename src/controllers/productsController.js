const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type !== null) { return res.status(errorMap.mapError(type)).json({ message }); }
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProduct(name);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { type, message } = await productsService.updateProduct(name, id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.removeProduct(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).json();
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  removeProduct,
};
