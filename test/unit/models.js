const productModel = require('../../models/products');
const { expect } = require('chai');
const { describe } = require('@hapi/joi/lib/base');

describe("testando camada de model", () => {
  describe('Chamada para função create', () => {
    const requisiçao = 233;
    describe('quando o produto é criado com sucesso', () => {
      it('testa de a função existe', async () => {
        expect.(productModel.create).to.be.a('function')
      })
    })
    describe('quando ocorre algum erro na criação do produto', () => {
      it('')
    })
  })



  describe('testando função de getAll', () => {

  })
})
