const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

class AuthRouter {
    constructor() {
        this.router = router;
        this.authController = new AuthController();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/auth/login', this.authController.login.bind(this.authController));
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new AuthRouter().getRoutes();
