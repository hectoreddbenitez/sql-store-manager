const productService = require('../services/productsServices');

const create = async (req, res) => {
 const { name, quantity } = req.body;
 const response = await productService.create(name, quantity);
 return res.status(response.codigo).json(response.message);
};

const findAll = async (_req, res) => {
  const response = await productService.findAll();
  console.log({response});
  res.status(response.codigo).json(response.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const response = await productService.findById(id);
  res.status(response.codigo).json(response.message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const response = await productService.updateProduct(id, name, quantity);
  res.status(response.codigo).json(response.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const response = await productService.deleteProduct(id);
  res.status(response.codigo).json(response.message);
};

module.exports = {
create,
findAll,
findById,
updateProduct,
deleteProduct,
};