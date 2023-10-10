<<<<<<< HEAD
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
const cors = require('cors');

const app = express();

// Middleware para analisar solicitações JSON
app.use(bodyParser.json());
app.use(cors());
// Rotas
app.use('/', routes); // Prefixamos com '/user' para seguir boas práticas

// Iniciar o servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(routes);

});
=======
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();
// Middleware para analisar solicitações JSON
app.use(bodyParser.json());
app.use(cors());
// Rotas
app.use('/', routes); // Prefixamos com '/user' para seguir boas práticas
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(authRoutes);

});
>>>>>>> PedroZ
