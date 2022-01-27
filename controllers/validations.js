const rescue = require('express-rescue');
const productService = require('../services/products.js');

// const validateDuplicateProduct = async (name) => {
//     const listProducts = await productService.getAll();
//     const result = listProducts.some((elem) => elem.name === name);
//   console.log(listProducts)
//     if (result) return 'exist';
//     return 'no exist';
//   }
//


const validateName = rescue(
  async (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' })
    if (name.length < 5) {
      return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
    }
    const listProducts = await productService.getAll();
    const result = listProducts.some((elem) => elem.name === name);

    if (result) {
      return res.status(409).json({ message: "Product already exists" })
    }

    next();
  }
);

const validateQuantity = rescue(
  async (req, res, next) => {
    const { quantity } = req.body;
    
    if (quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' })
    }
    if (quantity < 1 || typeof quantity !== 'number') {
      return res.status(422).json({ message: '"quantity" must be a number larger than or equal to 1'});
    }
    next();
  }
)

module.exports = {
  validateName,
  validateQuantity,
};
