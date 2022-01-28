const rescue = require('express-rescue');
const productService = require('../services/products');

const validateName = rescue(
  async (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
      return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
    }
    next();
  },
);

const duplicate = rescue(
  async (req, res, next) => {
    const { name } = req.body
    const listProducts = await productService.getAll();
    const result = listProducts.some((elem) => elem.name === name);

    if (result) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    next();
  }
)

const validateQuantity = rescue(
  async (req, res, next) => {
    const { quantity } = req.body;
    
    if (quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantity < 1 || typeof quantity !== 'number') {
      return res.status(422).json(
        { message: '"quantity" must be a number larger than or equal to 1' },
      );
    }
    next();
  },
);

const productExists = rescue(
  async (req, res, next) => {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  next();
  },
);

module.exports = {
  validateName,
  validateQuantity,
  duplicate,
  productExists,
};
