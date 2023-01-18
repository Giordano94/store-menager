const { connection } = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return allProducts;
};
getAllProducts();

const getProductsById = async (id) => {
  const [[productId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return productId;
};

module.exports = {
  getAllProducts,
  getProductsById,
};
