const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const userRoutes = router.post('/create', userController.createUser);
const selectRoutes = router.get('/all', userController.selectUser);

module.exports = userRoutes;
module.exports = selectRoutes;
