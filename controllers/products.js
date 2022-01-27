const Products = require('express').Router();
const rescue = require('express-rescue');

const productService = require('../services/products');
const {
  validateName,
  validateQuantity,
} = require('./validations');

Products.post('/',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await productService.createProduct(name, quantity);
    res.status(201).json(newProduct);
  })
);

module.exports = Products;
