module.exports = async (productsArray) => {
  const invalidQuantityProduct = await productsArray.find((product) => typeof 
  (product.quantity) !== 'number' || product.quantity <= 0);
  if (invalidQuantityProduct) {
    return {
     codigo: 422,
     message: "\"quantity\" must be greater than or equal to 1" };
  }
  return false;
};
