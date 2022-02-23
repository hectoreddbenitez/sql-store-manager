const productModels = require('../models/productsModels');

const productExist = async (data) => {
  const ZERO = 0;
  const { searchProduct } = productModels;
  const productList = await searchProduct(data); 
  if (productList.length !== ZERO) {
    return true;
  }
};

module.exports = productExist;