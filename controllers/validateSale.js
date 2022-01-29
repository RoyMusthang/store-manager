const rescue = require('express-rescue');

const validateId = (req, res, next) => {
  const inputs = req.body;
  if (!inputs.some((sale) => sale.product_id)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};

module.exports = {
  validateId,
}
