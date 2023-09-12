// app.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('database.db');

// Middleware para analisar solicitações JSON
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)'
  );
});

// Rotas
app.use('/', routes);

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
