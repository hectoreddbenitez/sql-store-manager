const productModels = require('../models/productsModels');

module.exports = async (data) => {
  const ZERO = 0;
  const { findById } = productModels;
  const productList = await findById(data); 
  if (productList.length !== ZERO) {
    return true;
  }
};
