module.exports = async (productsArray) => {
  const productSemQuantity = await productsArray
  .find((products) => products.quantity === undefined);
  if (productSemQuantity) {
    return {
      codigo: 400,
      message: '"quantity" is required' };
  }
  return false;
};
