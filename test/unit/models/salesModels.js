const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');
const { query } = require('../../../models/connection');

describe('Camada salesModels, testando LISTAGEM DE VENDAS', () => {
  describe('Quando não tem vendas cadastradas', () => {
    before(async () => {
      const query = [[]]; // retorno esperado nesse teste
      sinon.stub(connection, 'query').resolves(query);
    });
    // Restaurando a função `query` original após os teste.
    after(async () => {
      connection.query.restore();
    });

    it('responder com um array vazio', async () => {
      const response = await salesModels.findAll();

      expect(response).to.be.an('array');
    });
  });

  describe('Quando tem vendas cadastradas', () => {
    const querys = [[{}]]; // retorno esperado nesse teste
    before(async () => {
      sinon.stub(connection, 'query').resolves(querys);
    });
    // Restaurando a função `query` original após os teste.
    after(async () => {
      connection.query.restore();
    });

    it('responder com um array não vazio', async () => {
      const response = await salesModels.findAll();

      expect(response).to.be.an('array');

      expect(querys).to.deep.equal([[{}]]);
    });
  });
});

describe('Camada salesModels, testando LISTAGEM DE VENDAS pelo Id', () => {
  describe('Quando tem vendas cadastradas', () => {
    const payloadProduct = {"id": 1}
    const querys = [[{
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }]]; // retorno esperado nesse teste
    before(async () => {
      sinon.stub(connection, 'query').resolves(querys);
    });
    // Restaurando a função `query` original após os teste.
    after(async () => {
      connection.query.restore();
    });

    it('responder com um array não vazio', async () => {
      const response = await salesModels.findAllById();

      expect(response).to.be.an('array');

      expect(querys).to.deep.equal([[{"id": 1,
      "name": "produto A",
      "quantity": 10}]]);
    });
  });
});

