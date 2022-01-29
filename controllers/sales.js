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
    const newSales = await saleService.salesRecord(sales) ;
    res.status(201).json(newSales);
  }));

module.exports = Sales;
