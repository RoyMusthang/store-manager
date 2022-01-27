const productModel = require('../models/products');

async function createProduct(name, quantity) {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
}

module.exports = {
  createProduct,
};
