const connection = require('./connection');

const create = async (name, quantity) => {
   const [product] = await connection
  .execute('INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
  [name, quantity]);
  const response = {
    id: product.insertId,
    name,
    quantity,
  };
  return response;
};

const searchProduct = async (name) => {
  const [productExist] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE name = ?',
  [name]);
    return productExist;
};

const findAll = async () => {
  const [productsList] = await connection
  .execute('SELECT * FROM StoreManager.products');
  return productsList;
};

const findById = async (id) => {
  const [result] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?',
  [id]);
  return result;
};
// continua aqui. Amanhã vc consegue!!!!!!
const updateProduct = async (id, name, quantity) => {
  await connection
  .execute('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
  [id, name, quantity]);
};

const deleteProduct = async (id) => {
  const [result] = await connection
  .execute('DELETE FROM StoreManager.products WHERE id = ?',
  [id]);
  return result;
};

// findById(3).then((produto) => console.log(produto));

module.exports = {
  create,
  searchProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
};