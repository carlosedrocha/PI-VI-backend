<<<<<<< HEAD
const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const routes = express.Router();

routes.use('/user', userRoutes);
// router.use('/auth', authRoutes);

module.exports = routes;
=======
const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

class AppRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.use('/user', userRoutes);
    this.router.use('/auth', authRoutes);
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = new AppRouter().getRoutes();
>>>>>>> PedroZ
