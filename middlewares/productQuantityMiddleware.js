module.exports = async (req, res, next) => {
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