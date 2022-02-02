const sinon = require('sinon');
const { expect } = require('chai');
const request = require('supertest');

const ProductController = require('../../controllers/products');

describe('Busca de produtos', () => {
  it('Buscando na rota principal', () => {
    ProductController.get('/', function(req, res) {
      res.status(200).json({});
    });

    request(ProductController)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('object');
      });
  });
  it('Buscando numa rota específica', () => {
    ProductController.get('/1', function(req, res) {
      res.status(200).json({
        id: 1,
        name: "Beyblade",
        quantity: 10
      });
    });

    request(ProductController)
      .get('/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.deep.equal({ id: 1 });
      });
  });
}); 
