const sinon = require('sinon');
const { expect } = require('chai');
const productsControllers = require('../../../controllers/productsControllers');
const productServices = require('../../../services/productsServices');

describe(' Testando endpoint para cadastro de produtos',()=> {
  describe('Quando a requisição é feita com o atributo name igual um já cadastrado', () => {
    const response = {};
    const request = {};

    before(() => {
      sinon.stub(productServices, 'create')
        .resolves({ 
          codigo: 409,
          message: { message: 'Product already exists' },
         });
      request.body = { "name": "batata", "quantity": 100 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })

    after(() => {
      productServices.create.restore();
    });

    it('responder com status 409', async () => {
     const responseController = await productsControllers.create(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
    })

    it('é chamado o json com a mensagem "Product already exists"', async () => {
      await productsControllers.create(request, response);

      expect(response.json.calledWith({ "message": "Product already exists" })).to.be.equal(true);
    });
  })

  describe('Quando a requisição é feita corretamente', () => {
    const response = {};
    const request = {};

    before(() => {
      sinon.stub(productServices, 'create')
        .resolves({
          codigo: 201,
          message: { "id": 1, "name": "Morango", "quantity": 10 },
         });
      request.body = { "name": "Morango", "quantity": 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })

    after(() => {
      productServices.create.restore();
    });

    it('responder com status 201', async () => {
      await productsControllers.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    })

    it('é chamado o json com o producto cadastrado', async () => {
      await productsControllers.create(request, response);

      expect(response.json.calledWith({ "id": 1, "name": "Morango", "quantity": 10 })).to.be.equal(true);
    });
  })
});

// describe(' Testando endpoint para listagem de produtos',()=> {
//   describe('quando não existem produtos cadastrados', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       sinon.stub(productServices, 'findAll')
//         .resolves([[]]);
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
//     })

//     after(() => {
//       productServices.findAll.restore();
//     });

//     it('responder com status 200', async () => {
//      const responseController = await productsControllers.findAll(request, response);

//       expect(responseController.status.calledWith(200)).to.be.equal(true);
//     })

//     // it('é chamado o json com um Array vazio', async () => {
//     //   await productsControllers.findAll(request, response);

//     //   expect(response.json).to.be.an('array');
//     //   // expect(response).to.be.empty;
//     // });
//   })
// });