const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const routes = express.Router();

routes.use('/user', userRoutes);
// router.use('/auth', authRoutes);

module.exports = routes;
