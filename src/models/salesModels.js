const { connection } = require('./connection');

const getAllSales = async () => {
  const [allSales] = await connection.execute(
    // eslint-disable-next-line max-len
    'SELECT SlPr.sale_id, Sl.date, SlPr.product_id, SlPr.quantity FROM StoreManager.sales_products AS SlPr INNER JOIN StoreManager.sales AS Sl ON SlPr.sale_id = Sl.id ORDER BY sale_id, product_id ASC; ',
  );
  return allSales;
};

const getSalesById = async (id) => {
  const [[saleId]] = await connection.execute(
    // eslint-disable-next-line max-len
    ' SELECT Sl.date, SlPr.product_id, SlPr.quantity FROM StoreManager.sales_products AS SlPr INNER JOIN StoreManager.sales AS Sl ON SlPr.sale_id = Sl.id WHERE Sl.id = (?) ORDER BY sale_id , product_id ASC',
    [id],
  );
  return saleId;
};

module.exports = { getAllSales, getSalesById };
