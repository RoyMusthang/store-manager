const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productService = require('../../services/products');
const salesService = require('../../services/sales');

describe('Testes na camada de service', () => {
  beforeEach(async () => {
    const query = [[]];

    sinon.stub(connection, 'query').resolves(query);
  });

  afterEach(async () => connection.query.restore());

  describe('na funcionalidade de getAll', () => {
    it('retorna um array', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
    });
  });

//  describe('testa funcionalidade de create', () => {
//    it('espera que venha em formato de objeto', async () => {
//      const response = await productService.create("Jamba", 10);

 //     expect(response).to.be.an('object');
//    });
//  });

  describe('Testa funcionalidade do getAll', () => {
    it('espera que venha em formato de array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });
  });
}); 
