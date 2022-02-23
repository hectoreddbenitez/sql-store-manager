module.exports = async (productsArray) => {
  const productFound = await productsArray.find((product) => product.productId);
  if (!productFound) {
    return {
      codigo: 400,
      message: '"productId" is required' };
    }
    return false;
};