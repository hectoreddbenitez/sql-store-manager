const nameValidator = (req, res, next) => {
  const CINCO = 5;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < CINCO) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const quantityValidator = (req, res, next) => {
  const ZERO = 0;
  const { quantity } = req.body;
  if (quantity <= ZERO || typeof (quantity) === 'string') {
    return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  next();
};

module.exports = [
  nameValidator,
  quantityValidator,
];