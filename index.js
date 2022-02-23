require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');
const quantityMiddleware = require('./middlewares/productQuantityMiddleware');
const nameMiddleware = require('./middlewares/productNameMiddleware');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/sales', salesControllers.getSales);
app.get('/sales/:id', salesControllers.getSalesById);
app.post('/sales', salesControllers.sales);
app.put('/sales/:id', salesControllers.updateSale);

app.get('/products', productsControllers.findAll);
app.get('/products/:id', productsControllers.findById);
app.delete('/products/:id', productsControllers.deleteProduct);
app.use(nameMiddleware, quantityMiddleware);
app.post('/products', productsControllers.create);
app.put('/products/:id', productsControllers.updateProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
