const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/products')
const saleModel = require('../../models/sales')

describe('Insere um novo produto', () => {
    const productName = 'parada';
    const quantity = 10;

    before(() => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
        connection.execute.restore();
    });

    describe('em caso de sucesso:', () => {
        it('retorna um objeto', async () => {
            const result = await productsModel.create(productName, quantity);
            expect(result).to.be.a('object');
        });
        it('o objeto possui um id', async () => {
            const result = await productsModel.create(productName, quantity);
            expect(result).to.have.a.property('id');
        });
    });
});

describe('Registra os produtos de uma venda do banco', () => {
    before(() => {
      const sellItem = [{ affectedRows: 1 }];

      sinon.stub(connection, 'execute').resolves(sellItem);
    });

    after(() => {
      connection.execute.restore();
    });

    it('verifica se a função retorna corretamente', async () => {
      const obj = {
        insertId: 1,
        id: 1,
        quantity: 2
      }
      const result = await saleModel.create(obj);

      expect(result).to.deep.equal(undefined);
    });
  });
  describe('Atualiza uma venda do banco', () => {
    before(() => {
      const updatedItem = [{
        "saleId": 1,
        "itemUpdated": [
          {
            "product_id": 1,
            "quantity": 6
          }
        ]
      }];

      sinon.stub(connection, 'execute').resolves(updatedItem);
    });

    after(() => {
      connection.execute.restore();
    });

    it('verifica se a função retorna corretamente', async () => {
      const obj = {
        insertId: 1,
        id: 1,
        quantity: 6
      }
      const result = await saleModel.update(obj);

      expect(result).to.deep.equal({
        "saleId": 1,
        "itemUpdated": [
          {
            "product_id": 1,
            "quantity": 6
          }
        ]
      });
    });
  });
