const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');
const { execute } = require('../../../models/connection');

describe('Camada salesModels, testando LISTAGEM DE VENDAS', () => {
  describe('Quando não tem vendas cadastradas', () => {
    before(async () => {
      const execute = [[]]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    // Restaurando a função `execute` original após os teste.
    after(async () => {
      connection.execute.restore();
    });

    it('responder com um array vazio', async () => {
      const response = await salesModels.findAll();

      expect(response).to.be.an('array');
    });
  });

  describe('Quando tem vendas cadastradas', () => {
    const executes = [[{}]]; // retorno esperado nesse teste
    before(async () => {
      sinon.stub(connection, 'execute').resolves(executes);
    });
    // Restaurando a função `execute` original após os teste.
    after(async () => {
      connection.execute.restore();
    });

    it('responder com um array não vazio', async () => {
      const response = await salesModels.findAll();

      expect(response).to.be.an('array');

      expect(executes).to.deep.equal([[{}]]);
    });
  });
});

describe('Camada salesModels, testando LISTAGEM DE VENDAS pelo Id', () => {
  describe('Quando tem vendas cadastradas', () => {
    const payloadProduct = {"id": 1}
    const executes = [[{
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }]]; // retorno esperado nesse teste
    before(async () => {
      sinon.stub(connection, 'execute').resolves(executes);
    });
    // Restaurando a função `execute` original após os teste.
    after(async () => {
      connection.execute.restore();
    });

    it('responder com um array não vazio', async () => {
      const response = await salesModels.getSalesById();

      expect(response).to.be.an('array');

      expect(executes).to.deep.equal([[{"id": 1,
      "name": "produto A",
      "quantity": 10}]]);
    });
  });
});

