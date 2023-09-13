const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const userRoutes = router.post('/create', userController.createUser);

module.exports = userRoutes;
