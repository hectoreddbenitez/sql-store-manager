const sinon = require('sinon');
const { expect } = require('chai');
const salesControllers = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');

describe(' Testando endpoint para cadastro de sales',()=> {
  // describe('Quando a requisição é feita com o atributo name igual um já cadastrado', () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     sinon.stub(salesServices, 'create')
  //       .resolves({ 
  //         codigo: 409,
  //         message: { message: 'Sale already exists' },
  //        });
  //     request.body = { "name": "batata", "quantity": 100 };
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //   })

  //   after(() => {
  //     salesServices.create.restore();
  //   });

  //   it('responder com status 409', async () => {
  //    await salesControllers.create(request, response);

  //     expect(response.status.calledWith(409)).to.be.equal(true);
  //   })

  //   it('é chamado o json com a mensagem "Sale already exists"', async () => {
  //     await salesControllers.create(request, response);

  //     expect(response.json.calledWith({ "message": "Sale already exists" })).to.be.equal(true);
  //   });
  // })

  describe('Quando a requisição é feita corretamente', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [
        {
          "productId": 1,
          "quantity": 3
        }
      ];
      sinon.stub(salesServices, 'create')
        .resolves({
          "id": 1,
          "itemsSold": [
            {
              "productId": 1,
              "quantity": 3
            }
          ]
        });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })

    after(() => {
      salesServices.create.restore();
    });

    it('responder com status 201', async () => {
      await salesControllers.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    })

    it('é chamado o json com a sales cadastrada', async () => {
      await salesControllers.create(request, response);

      expect(response.json.calledWith({
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      })).to.be.equal(true);
    });
  })
});

describe(' Testando endpoint para listagem de produtos',()=> {
  describe('Quando tem produtos cadastrados', () => {
    const response = {};
    const request = {};

    before(() => {
      sinon.stub(salesServices, 'findAll')
        .resolves(  
          [
            {
              "saleId": 1,
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "saleId": 1,
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
          ]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })

    after(() => {
      salesServices.findAll.restore();
    });

    it('responder com status 200', async () => {
      await salesControllers.findAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é chamado o json com um array dos produtos cadastrados', async () => {
      await salesControllers.findAll(request, response);

      expect(response.json.calledWith([
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ])).to.be.equal(true);
    });
  });
});