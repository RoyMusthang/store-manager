const Sales = require('express').Router();
const rescue = require('express-rescue');
const saleService = require('../services/sales');
const {
  validateId,
  validateQuantity,
} = require('./validateSale');

Sales.post('/',
  validateId,
  validateQuantity,
  rescue(async (req, res) => {
    const { body: sales } = req;
    const newSales = await saleService.create(sales);
    res.status(201).json(newSales);
  }));

Sales.get('/',
  rescue(async (req, res) => {
    const sales = await saleService.getAll();
    res.status(200).json(sales)
  }))

Sales.get('/:id', 
  rescue(async (req, res) => {
    const { id: saleId } = req.params;
    const sale = await getById(saleId);
    res.status(200).json(sale);
  }))

module.exports = Sales;
