const salesModel = require('../models/salesModels');
const productsModels = require('../models/productsModels');

const idValidator = async (response) => {
 const responseEvery = await response.every((e) => e.length !== 0);
   if (!responseEvery) {
     return {
        codigo: 404,
        message: 'Product not found',
     }; 
   }
};

const salesRegistrer = async (productsArray) => {
  const responseMap = await productsArray
  .map(async (product) => productsModels.findById(product.productId));
  const promiseSolvedResponseMap = await Promise.all(responseMap);
  const notValidId = await idValidator(promiseSolvedResponseMap);
  if (notValidId) return notValidId;

  const { id } = await salesModel.salesRegistrer(new Date());
  // CUIDADO!!! num array de promises tem que esperar todas as promises. Deve ser utilizado Promise.all!
  await Promise.all(productsArray.map(async ({ productId, quantity }) => salesModel
  .salesProductRegistrer(id, productId, quantity)));
  return {
    id,
    itemsSold: productsArray,
  };
};

const getSales = async () => {
  const salesList = await salesModel.findAll();
  return salesList;
};

const getSalesById = async (id) => {
  const salesList = await salesModel.getSalesById(id);
  if (salesList.length === 0) {
    return {
      codigo: 404,
      message: { message: 'Sale not found' },
    };
  }
  return {
    codigo: 200,
    message: salesList, 
  };
};

const updateSale = async (id, productsArray) => {
  const responseMap = await productsArray
  .map(async (product) => productsModels.findById(product.productId));
  const promiseSolvedResponseMap = await Promise.all(responseMap);
  const notValidId = await idValidator(promiseSolvedResponseMap);
  if (notValidId) return notValidId;

  await Promise.all(productsArray
  .map(async ({ productId, quantity }) => salesModel.updateSale(id, productId, quantity)));
  return {
    saleId: id,
    itemUpdated: productsArray,
  };
};

module.exports = {
  salesRegistrer,
  updateSale,
  getSales,
  getSalesById,
};