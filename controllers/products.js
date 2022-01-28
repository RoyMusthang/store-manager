const Products = require('express').Router();
const rescue = require('express-rescue');

const productService = require('../services/products');
const {
  validateName,
  validateQuantity,
  productExists, 
} = require('./validations');

Products.get('/',
  rescue(async (req, res) => {
    const getAll = await productService.getAll();
    res.status(200).json(getAll);
  }));

Products.post('/',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await productService.create(name, quantity);
    res.status(201).json(newProduct);
  }));

Products.get('/:id',
  productExists,
  rescue(async (req, res) => {
    const { id } = req.params;
    const getProduct = await productService.getById(id);
    res.status(200).json(getProduct);
  }));

Products.put('/:id',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const attProduct = await productService.attProduct(id, name, quantity);
    res.status(200).json(attProduct);
  }));

module.exports = Products;
