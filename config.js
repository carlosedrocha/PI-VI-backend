// config.js

module.exports = {
  port: process.env.PORT || 3001,
  // mongoURI: process.env.MONGODB_URI || 'mongodb://localhost/seu-banco-de-dados',
  jwtSecret: process.env.JWT_SECRET || 'segredo-super-seguro',
  // Outras configurações aqui...
  async headers() {
    return [
      {
        key: 'Access-Control-Allow-Origin',
        value: '*',
      },
      {
        key: 'Access-Control-Allow-Methods',
        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      },
      {
        key: 'Access-Control-Allow-Headers',
        value:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      },
    ];
  }
};
