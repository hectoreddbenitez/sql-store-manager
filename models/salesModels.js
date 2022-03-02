const connection = require('./connection');

const create = async (date) => {
  const [newSale] = await connection
    .query('INSERT INTO StoreManager.sales (date) VALUES (?)',
    [date]);
    return {
    id: newSale.insertId,
    };
};

const salesProductRegistrer = async (salesId, productId, quantity) => {
  const [saledproductRegister] = await connection
    .query('INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
    [salesId, productId, quantity]);
  return { id: saledproductRegister.insertId };
};

const findAll = async () => {
  const [salesList] = await connection
    .query(`SELECT sale_id AS saleId, date, product_id AS productId, quantity 
    FROM StoreManager.sales D INNER JOIN StoreManager.sales_products P ON D.id = P.sale_id`);
  return salesList;
};

const findAllById = async (id) => {
  const [saleById] = await connection
    .query(`SELECT date, product_id AS productId, quantity FROM StoreManager.sales D 
    INNER JOIN StoreManager.sales_products P ON D.id = P.sale_id WHERE id = ?`,
    [id]);
  return saleById;
};

const updateSale = async (saleId, productId, quantity) => {
  const [result] = await connection
    .query(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = (?)',
    [productId, quantity, saleId],
    );
  return result;
};

module.exports = {
  create,
  salesProductRegistrer,
  findAll,
  findAllById,
  updateSale,
};