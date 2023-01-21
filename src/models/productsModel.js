const { connection } = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return allProducts;
};

const getProductsById = async (id) => {
  const [[productId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return productId;
};

const insertProduct = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [newProduct],
  );

  return insertId;
};

const updateProduct = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

const removeProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [
    id,
  ]);
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  removeProduct,
};
