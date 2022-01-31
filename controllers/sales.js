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
    res.status(200).json(sales);
  }));

Sales.get('/:id', 
  rescue(async (req, res) => {
    const { id: saleId } = req.params;
    const sale = await saleService.getById(saleId);
    if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' }); 
    res.status(200).json(sale);
  }));

Sales.put('/:id',
  validateId,
  validateQuantity,
  rescue(async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const itemUpdated = await saleService.update(id, product);
    res.status(200).json(itemUpdated);
  }));

module.exports = Sales;
