const validateId = (req, res, next) => {
  const inputs = req.body;
  if (!inputs.some((sale) => sale.product_id)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const inputs = req.body;
  if (inputs.some((sale) => sale.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (inputs.some((sale) => sale.quantity < 1 || typeof sale.quantity !== 'number')) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  validateId,
  validateQuantity,
};
