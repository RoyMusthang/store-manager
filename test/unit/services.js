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

  describe('Testa funcionalidade do getAll', () => {
    it('espera que venha em formato de array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });
  });
    describe('Acrescenta um produto no bando de dados', () => {
    const payloadProduct = "Gume do Infinito";
    const pal = 30;

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

      it('verifica se retorna o id criado', async () => {
        const response = await productService.create(payloadProduct, pal);

        expect(response.id).to.be.equal(1);
      });
  });
  describe('Busca um objeto do banco de dados pelo id', () => {
    describe('Quando não existir nenhum produto cadastrado com o id', () => {
      before(() => {  
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna null', async () => {
        const result = await productService.getById(1);

        expect(result).to.be.an('null');
      });

    });
    describe('Quando existir um produto cadastrado com o id', () => {
      before(() => {
        const execute = [{ id: 1, name: "Capuz da Morte de Rabadon", quantity: 30 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const result = await productService.getById(1);

        expect(result).to.be.an('null');
      });

      });
  });
}); 
