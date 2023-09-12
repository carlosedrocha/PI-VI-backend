// config.js

module.exports = {
  port: process.env.PORT || 3000,
  // mongoURI: process.env.MONGODB_URI || 'mongodb://localhost/seu-banco-de-dados',
  jwtSecret: process.env.JWT_SECRET || 'segredo-super-seguro',
  // Outras configurações aqui...
};
