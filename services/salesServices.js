const salesModel = require('../models/salesModels');
const quantityValidator = require('../middlewares/salesQuantityValidator');
const idValidator = require('../middlewares/salesIdValidator');
const existId = require('../middlewares/existId');
const quantityNotNull = require('../middlewares/salesQuantityNotNull');

const paramsValidator = async (productsArray) => {
  const notValidId = await idValidator(productsArray);
  if (notValidId) return notValidId;
  const isValidId = await existId(productsArray);
  if (isValidId) return isValidId;
  const notNullQuantity = await quantityNotNull(productsArray);
  if (notNullQuantity) return notNullQuantity;
  const notValidQuantity = await quantityValidator(productsArray);
  if (notValidQuantity) return notValidQuantity;
};

const salesRegistrer = async (productsArray) => {
  const response = await paramsValidator(productsArray);
  if (response) return response;
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
  const response = await paramsValidator(productsArray);
  if (response) return response;

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