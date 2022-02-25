// const { json } = require('body-parse
const salesService = require('../services/salesServices');

const sales = async (req, res) => {
  try {
    const productsArray = req.body;
    const response = await salesService.salesRegistrer(productsArray);
    if (typeof response.message === 'string') {
      return res.status(response.codigo).json({ message: response.message });
    }
    console.log(response);
    return res.status(201).json(response);
  } catch (err) {
    // console.log(err);
    return res.status(500).end();
  }
};

const getSales = async (_req, res) => {
  const response = await salesService.getSales();
  return res.status(200).json(response);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSalesById(id);
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
sales,
getSales,
updateSale,
getSalesById,
};