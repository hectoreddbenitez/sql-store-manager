const sinon = require('sinon');
const { expect } = require('chai');
const productModels = require('../../../models/productsModels')
const productsServices = require('../../../services/productsServices')

describe('Testando camada Service, CREATE PRODUTO', () => {
  describe('Quando a requisição é feita com sucesso', () => {
    const response = {};
    const request = {};
  
    before(() => {
      sinon.stub(productModels, 'findByName').resolves([]);
      sinon.stub(productModels, 'create')
        .resolves({
          id: 1,
          name: 'batata',
          quantity: 10,
        });
      request.body = { "name": "batata", "quantity": 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    after(() => {
      productModels.create.restore();
    });
  
    it('retorna o status 201 e message com o produto cadastrado', async () => {
     const responseServices = await productsServices.create(request, response);
  
      expect(responseServices).to.have.property('codigo', 201);
      expect(responseServices.message).to.have.property( 'id', 1);
      expect(responseServices.message).to.have.property( 'name', 'batata');
      expect(responseServices.message).to.have.property( 'quantity', 10);
    });
  });
});
