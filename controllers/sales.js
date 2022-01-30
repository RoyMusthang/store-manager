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
    const newSales = await saleService.salesRecord(sales);
    res.status(201).json(newSales);
  }));

Sales.get('/:id', 
  rescue(async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: "ainda não fiz nada aqui bro!" })
  }))

Sales.get('/',
  rescue(async (req, res) => {
    res.status(200).json({ message: "ainda não tem a rota" })
  }))

module.exports = Sales;
