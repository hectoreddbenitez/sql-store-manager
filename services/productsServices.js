const productModels = require('../models/productsModels');

const create = async (name, quantity) => {
const response = await productModels.findByName(name);
if (response.length !== 0) {
  return { 
    codigo: 409, 
    message: { message: 'Product already exists' },
   };
}
const product = await productModels.create(name, quantity);
  return {
  codigo: 201,
  message: product,
  };
};

const findAll = async () => {
  const productsList = await productModels.findAll();
  return {
    codigo: 200,
    message: productsList,
   };
  };

const findById = async (id) => {
  const result = await productModels.findById(id);
   if (result.length === 0) {
    return { 
      codigo: 404,
      message: { message: 'Product not found' },
    };
   }
    return {
      codigo: 200,
      message: result[0],
    };
};

const updateProduct = async (id, name, quantity) => {
  const result = await productModels.findById(id);
  if (result.length === 0) {
    return { 
      codigo: 404,
      message: { message: 'Product not found' },
    };
  }

  await productModels.updateProduct(id, name, quantity);
  return {
    codigo: 200,
    message: { id, name, quantity },
  };
};

const deleteProduct = async (id) => {
  const result = await productModels.findById(id);
  if (result.length === 0) {
    return { 
      codigo: 404,
      message: { message: 'Product not found' },
    };
  }

  await productModels.deleteProduct(id);
  return {
    codigo: 204,
    message: result[0],
  };
};

module.exports = {
  create,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
};