const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const userRoutes = router.post('/create', userController.createUser);
const getUser = router.get('/getUser', userController.getUser);
module.exports = userRoutes;
module.exports = getUser;
