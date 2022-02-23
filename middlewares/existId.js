const salesFindById = require('./salesFindById');

const idExist = async (productsArray) => {
const idProductExist = await productsArray
.map(async (product) => salesFindById(product.productId));
await Promise.all(idProductExist);
console.log(idProductExist);
 if (idProductExist === undefined) {
   return {
      codigo: 404,
      message: 'Product not found',
   };
 }
 return false;
};

module.exports = idExist;
