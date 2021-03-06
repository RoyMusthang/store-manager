const sinon = require('sinon');
const { expect, assert } = require('chai');
const request = require('supertest');
const productsModel = require('../../models/products');
const connection = require('../../models/connection');
const salesModel = require('../../models/sales');
const ProductController = require('../../controllers/products');
const validatesProduct = require('../../controllers/validations');
const validatesSale = require('../../controllers/validateSale');

describe('Testando a rotas de products', () => {
  const res = {};
  const req = {};
  const next = () => {};

  describe('Quando não é passado o name pelo body', () => {
    before(() => {
      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 400', async () => {
      await validatesProduct.validateName(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Quando o tamanho de name é menor que 5 caracteres', () => {
    before(() => {
      req.body = {name: 'Fone'};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesProduct.validateName(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });
});

describe('Testando a função validateName', () => {
  const res = {};
  const req = {};
  const next = () => {};

  describe('Quando não é passado o name pelo body', () => {
    before(() => {
      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 400', async () => {
      await validatesProduct.validateName(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Quando o tamanho de name é menor que 5 caracteres', () => {
    before(() => {
      req.body = {name: 'Fone'};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesProduct.validateName(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });
});

describe('Testando a função validateQuantity', () => {
  const res = {};
  const req = {};
  const next = () => {};

  describe('Quando não é passado o quantity pelo body', () => {
    before(() => {
      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 400', async () => {
      await validatesProduct.validateQuantity(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Quando é passada uma string para o quantity', () => {
    before(() => {
      req.body = { quantity: 'string' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesProduct.validateQuantity(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });

  describe('Quando é passado 0 para o quantity', () => {
    before(() => {
      req.body = { quantity: 0 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesProduct.validateQuantity(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });
});


describe('Testando a função validateId', () => {
  const req = {};
  const res = {};
  const next = () => {};

  describe('Quando não é passado o product_id', () => {
    before(() => {
      req.body = [{ quantity: 1 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 400', async () => {
      await validatesSale.validateId(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Quando não é passado o quantity', () => {
    before(() => {
      req.body = [{ product_id: 1 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 400', async () => {
      await validatesSale.validateQuantity(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Quando quantity é igual a 0', () => {
    before(() => {
      req.body = [{ product_id: 1, quantity: 0 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesSale.validateQuantity(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });
});

describe('Testando a função validade quantity', () => {
  const req = {};
  const res = {};
  const next = () => {};

  describe('Quando quantity é -1', () => {
    before(() => {
      req.body = [{ quantity: -1 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesSale.validateQuantity(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });

  describe('Quando quantity é uma string', () => {
    before(() => {
      req.body = [{ quantity: 'string' }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('é chamado com o status 422', async () => {
      await validatesSale.validateQuantity(req, res, next);

      expect(res.status.calledWith(422)).to.be.true;
    });
  });
});

describe('Testando se não adiciona produto duplicado', () => {
  const req = [{ name: "jamba" }];
  const res = {};
  const next = () => {};
  describe('Quando passa um produto duplicado', () => {
    before(() => {
      req.body = [{ name: "jamba" }];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    it('falha', async () => {
      await validatesProduct.duplicate(req, res, next);
      expect(res.status.calledWith(409)).to.be.false;
    })
  });
});

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


//  Sales Test
describe('Criando teste para o salesModels', () => {
  describe('Testando o método "create"', () => {
    const mockResult = { insertId: 2 }
    before(() => {
      sinon.stub(connection, 'query').resolves(mockResult)
    })

    after(() => {
      connection.query.restore()
    })

    it('Testa se o método existe.', () => {
      assert.exists(salesModel.create());
    })
  });
});
