const validQuantity = async (req, res, next) => {
  const productsArray = req.body;
  const invalidQuantityProduct = await productsArray.find((product) => typeof 
  (product.quantity) !== 'number' || product.quantity <= 0);
  if (invalidQuantityProduct) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const quantityNotNull = async (req, res, next) => { 
  const productsArray = req.body;
  console.log({ productsArray });
  const notQuantityFound = await productsArray
    .find((products) => products.quantity === undefined);
    if (notQuantityFound) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    next();
};

const productNotNull = async (req, res, next) => {
  const productsArray = req.body;
  const notProductFound = await productsArray
    .find((product) => product.productId === undefined);
    if (notProductFound) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    next();
};

module.exports = [
  quantityNotNull,
  validQuantity,
  productNotNull,
];