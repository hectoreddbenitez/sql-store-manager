const validQuantity = (req, res, next) => {
  const productsArray = req.body;
  const invalidQuantityProduct = productsArray.find((product) => typeof 
  (product.quantity) !== 'number' || product.quantity <= 0);
  if (invalidQuantityProduct) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const quantityNotNull = (req, res, next) => { 
  const productsArray = req.body;
  if (Array.isArray(productsArray)) {
    const notQuantityFound = productsArray
      .find((products) => products.quantity === undefined);
      if (notQuantityFound) {
        return res.status(400).json({ message: '"quantity" is required' });
      }
      next();
  } else res.status(400).json({ message: 'é pra ser array, krlh!' });
};

const productNotNull = (req, res, next) => {
  const productsArray = req.body;
  const notProductFound = productsArray
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