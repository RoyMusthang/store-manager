const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');

const productsModel = require('../../models/products');
const salesModel = require('../../models/sales');

const productsService = require('../../services/products');
const salesService = require('../../services/sales');


// Testes do productsService.
describe('Testando o camada de service', () => {
  describe('Testando arquivo de products', () => {
    mockgetAll = [
      {
        "id": 1,
        "name": "Jamba",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Rivotril",
        "quantity": 20
      },
    ]

    describe('Testando "productsService.create()"', () => {

      before(() => {
        sinon.stub(connection, 'query').resolves([{ id: 1, name: "birulei", quantity: 3 }])
        sinon.stub(productsModel, 'getAll').resolves([{ name: 'Jamba' }])
        sinon.stub(productsModel, 'create').resolves({ id: 1, name: "Jhonson", quantity: 3 })
      });
      after(() => {
        productsModel.getAll.restore()
        productsModel.create.restore()
        connection.query.restore();
      });

      it('Testa se criar um novo produto. ', async () => {
        const result = await productsService.create({ name: "teste 1", quantity: 3 });
        expect(result).to.be.all.keys('name', 'id', 'quantity')
      });
    });

    describe('Testando funcionalidade getAll', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves(mockgetAll)
      });
      after(() => {
        productsModel.getAll.restore()
      });
      it('Testa se a função retorna uma lista de objetos.', async () => {
        const resultQuery = await productsService.getAll()
        expect(mockgetAll).to.be.equal(resultQuery)
      });
    });

    describe('Testando "productsService.getById()"', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves([mockgetAll[1]])
      });
      after(() => {
        productsModel.getById.restore()
      });
      it('Testa se a função retorna o objeto buscando', async () => {
        const [resultQuery] = await productsService.getById(2)
        expect(mockgetAll[1]).to.be.equal(resultQuery)
      });
    });
  });

// Teste do salesService
  describe('Testando arquivo de sales', () => {
    describe('Testando funcionalidade getAll', () => {
      mockgetAll = [
        {
          "saleId": 1,
          "date": "2022-02-01T11:39:40.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "saleId": 2,
          "date": "2022-02-01T11:39:40.000Z",
          "product_id": 2,
          "quantity": 4
        }
      ]
      it('Testa se o retorno e um lista de produto.', async () => {
        sinon.stub(salesModel, 'getAll').resolves(mockgetAll)
        const expectResult = await salesService.getAll()
        expect(mockgetAll).to.deep.equal(expectResult);
      });

    });
  });
});
