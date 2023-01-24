const { connection } = require('./connection');

const getAllSales = async () => {
  const [allSales] = await connection.execute(

    `SELECT SlPr.sale_id AS saleId, Sl.date, SlPr.product_id AS productId, SlPr.quantity
    FROM StoreManager.sales_products AS SlPr
    INNER JOIN StoreManager.sales AS Sl ON SlPr.sale_id = Sl.id
    ORDER BY sale_id , product_id ASC;`,
  );
  return allSales;
};

const getSalesById = async (id) => {
  const [saleId] = await connection.execute(

    `SELECT Sl.date, SlPr.product_id AS productId, SlPr.quantity
    FROM StoreManager.sales_products AS SlPr
    INNER JOIN StoreManager.sales AS Sl ON SlPr.sale_id = Sl.id
    WHERE Sl.id = (?) ORDER BY sale_id , product_id ASC`, [id],
  );
  return saleId;
};

module.exports = { getAllSales, getSalesById };
