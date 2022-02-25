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
     await productsControllers.create(request, response);

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
      request.body = { "name": "Morango", "quantity": 10 };
      sinon.stub(productServices, 'create')
        .resolves({
          codigo: 201,
          message: { "id": 1, "name": "Morango", "quantity": 10 },
         });
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
//   describe('Quando tem produtos cadastrados', () => {
//     const response = {};

//     before(() => {
//       sinon.stub(productServices, 'findAll')
//         .resolves([[
//           {
//             "id": 1,
//             "name": "produto A",
//             "quantity": 10
//           },
//           {
//             "id": 2,
//             "name": "produto B",
//             "quantity": 20
//           }
//         ]]);
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
//     })

//     after(() => {
//       productServices.findAll.restore();
//     });

//     it('responder com status 200', async () => {
//      const response = await productsControllers.findAll();
//       console.log('====>',response);
//       expect(response.status.calledWith(200)).to.be.equal(true);
//     })

//     it('é chamado o json com um array dos produtos cadastrados', async () => {
//       const response = await productsControllers.findAll();

//       expect(response.json.calledWith([[
//         {
//           "id": 1,
//           "name": "produto A",
//           "quantity": 10
//         },
//         {
//           "id": 2,
//           "name": "produto B",
//           "quantity": 20
//         }
//       ]])).to.be.equal(true);
//     });
//   });
// });