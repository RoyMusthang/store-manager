require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const { bodyContains } = require('frisby/src/frisby/expects');

const product = require('./controllers/products')
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', product.createProduct)

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
})
