// const { json } = require('body-parse
const salesService = require('../services/salesServices');

const create = async (req, res) => {
  try {
    const productsArray = req.body;
    const response = await salesService.create(productsArray);
    if (typeof response.message === 'string') {
      return res.status(response.codigo).json({ message: response.message });
    }
    return res.status(201).json(response);
  } catch (err) {
    return res.status(500).end();
  }
};

const findAll = async (_req, res) => {
  const response = await salesService.findAll();
  return res.status(200).json(response);
};

const findAllById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.findAllById(id);
  return res.status(response.codigo).json(response.message);
};

const updateSale = async (req, res) => {
  const productsArray = req.body;
  const { id } = req.params;
  const response = await salesService.updateSale(id, productsArray);
  if (typeof response.message === 'string') {
    return res.status(response.codigo).json({ message: response.message });
  } 
  return res.status(200).json(response);
};

module.exports = {
create,
findAll,
updateSale,
findAllById,
};