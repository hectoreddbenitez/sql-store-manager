const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

describe('Testando camada de models, CADASTRO DE PRODUTOS', () => {
    describe('Quando a requisição é feita com suceso', () => {
      const payloadProduct = {"name": 'batata',
      "quantity": 100};
  
      before(async () => {
        const execute = [{ 'insertId': 1, "name": "batata", "quantity": 100 }]; // retorno esperado nesse teste
        sinon.stub(connection, 'execute').resolves(execute);
      });
      // Restaurando a função `execute` original após os teste.
      after(async () => {
        connection.execute.restore();
      });
  
      it('responder com um objeto com o produto cadastrado', async () => {
        const response = await productsModels.create(payloadProduct.name, payloadProduct.quantity);
        console.log(response)
  
        expect(response).to.be.a('object');
        expect(response).to.have.a.property('id', 1);
        expect(response).to.have.a.property('name', 'batata');
        expect(response).to.have.a.property('quantity', 100);

      })
    });
})

describe('Testando LISTAGEM DE PRODUTOS', () => {
  describe('Quando não tem produtos cadastrados', () => {

    before(async () => {
      const execute = [[]]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    // Restaurando a função `execute` original após os teste.
    after(async () => {
      connection.execute.restore();
    });

    it('responder com um array vazio', async () => {
      const response = await productsModels.findAll();
      console.log(response)

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  });

    describe('Quando tem produtos cadastrados', () => {
  
      before(async () => {
        const execute = [[{ id: 1, name: 'Batata frita', quantity: 10 }]]; // retorno esperado nesse teste
        sinon.stub(connection, 'execute').resolves(execute);
      });
      // Restaurando a função `execute` original após os teste.
      after(async () => {
        connection.execute.restore();
      });
  
      it('responder com um array com os produtos cadastrados', async () => {
        const response = await productsModels.findAll();
        console.log(response)
  
        expect(response).to.be.an('array');
        expect(response[0]).to.have.a.property('id', 1);
        expect(response[0]).to.have.a.property('name', 'Batata frita');
        expect(response[0]).to.have.a.property('quantity', 10);
      })
    });
})

// describe('Testando camada de models, PROCURA PRODUTOS PELO "Id"', () => {
  // describe('Quando não tem produtos cadastrados', () => {
  //   const payloadProduct = {id: 30};

  //   before(async () => {
  //     const execute = [[]]; // retorno esperado nesse teste
  //     sinon.stub(connection, 'execute').resolves(execute);
  //   });
  //   // Restaurando a função `execute` original após os teste.
  //   after(async () => {
  //     connection.execute.restore();
  //   });

  //   it('responder com um array vazio', async () => {
  //     const response = await productsModels.findById(payloadProduct.id);
  //     console.log(response)

  //     expect(response).to.be.an('array');
  //     expect(response).to.be.empty;
  //   })
  // })

//   describe('Quando o id informado, corresponde com o de algum produto cadastrado', () => {
//   const payloadProduct = {id: 12};

//     before(async () => {
//       const execute = [[{ id: 12, name: 'Morango', quantity: 50 }]]; // retorno esperado nesse teste
//       sinon.stub(connection, 'execute').resolves(execute);
//     });
//     // Restaurando a função `execute` original após os teste.
//     after(async () => {
//       connection.execute.restore();
//     });

//     it('responder com um array com o produto cadastrado', async () => {
//       const response = await productsModels.findById(payloadProduct.id);
//       console.log(response)

//       expect(response).to.be.an('array');
//       expect(response[0]).to.have.a.property('id', 12);
//       expect(response[0]).to.have.a.property('name', 'Morango');
//       expect(response[0]).to.have.a.property('quantity', 50);
//     })
//   })
// })

describe('Testando camada de models, UPDATE DE PRODUTOS', () => {
    describe('Quando o id informado, corresponde com o de algum produto cadastrado', () => {
    const payloadProduct = {id: 12, "name": 'Maçã',
    "quantity": 40};

    before(async () => {
      const execute = [[{ id: 12, name: 'Maçã', quantity: 40 }]]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    // Restaurando a função `execute` original após os teste.
    after(async () => {
      connection.execute.restore();
    });

    it('chamar a função connect.execute com os parámetros fornecidos', async () => {
      await productsModels.updateProduct(payloadProduct.id, payloadProduct.name, payloadProduct.quantity);

      expect(connection.execute.calledWith('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',[payloadProduct.id, payloadProduct.name, payloadProduct.quantity])).to.be.ok;
    })
  })
})

describe('Testando camada de models, DELETE PRODUTOS', () => {
  const payloadProduct = {id: 12};

  before(async () => {
    const execute = [[{ id: 12, name: 'Morango', quantity: 50 }]]; // retorno esperado nesse teste
    sinon.stub(connection, 'execute').resolves(execute);
  });
  // Restaurando a função `execute` original após os teste.
  after(async () => {
    connection.execute.restore();
  });

  it('responder com um array com o produto deletado', async () => {
    const response = await productsModels.deleteProduct(payloadProduct.id);

    expect(response).to.be.an('array');
    expect(response[0]).to.have.a.property('id', 12);
    expect(response[0]).to.have.a.property('name', 'Morango');
    expect(response[0]).to.have.a.property('quantity', 50);
  })
});

// describe('Testando camada de models, CADASTRO DE SALES', () => {
//   describe('Quando a requisição é feita com suceso', () => {
//     const payloadSales = 
//       {
//         "product_id": 1,
//         "quantity": 2
//       }
  
//     before(async () => {
//       const execute = [{
//         "id": 1,
//         "itemsSold": [
//           {
//             "product_id": 1,
//             "quantity": 2
//           },
//         ]
//       }]; // retorno esperado nesse teste
//       sinon.stub(connection, 'execute').resolves(execute);
//     });
//     // Restaurando a função `execute` original após os teste.
//     after(async () => {
//       connection.execute.restore();
//     });

//     it('responder com um objeto com a venda cadastrada', async () => {
//       const response1 = await salesModels.salesRegistrer(new Date());
//       const response2 = await salesModels.salesProductRegistrer(response1.id, payloadSales);

//       expect(response2).to.be.a('object');
//       expect(response2).to.have.a.property('id', 1);
//       expect(response2).to.have.a.property('itemsSold', []);
//       expect(response2.itemsSold).to.have.a.property('quantity', 2);

//     })
//   });
// });