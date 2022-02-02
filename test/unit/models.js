const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/products')

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
