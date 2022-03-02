require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');
const salesMiddleware = require('./middlewares/salesMiddleware');
const productsMiddleware = require('./middlewares/productsMiddleware');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/sales', salesControllers.getSales);
app.get('/sales/:id', salesControllers.getSalesById);
app.use('/sales',...salesMiddleware);
app.post('/sales', salesControllers.sales);
app.put('/sales/:id', salesControllers.updateSale);

app.get('/products', productsControllers.findAll);
app.get('/products/:id', productsControllers.findById);
app.delete('/products/:id', productsControllers.deleteProduct);
app.use('/products', ...productsMiddleware);
app.post('/products', productsControllers.create);
app.put('/products/:id', productsControllers.updateProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
