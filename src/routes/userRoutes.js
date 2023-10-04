const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

class UserRouter {
  constructor() {
    this.router = router;
    this.userController = userController;
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/all', this.userController.selectUser);
    // this.router.post('/create', this.userController.createUser);
    // this.router.delete('/delete/:id', this.userController.deleteUser);
    // this.router.put('/updateUserName/:id', this.userController.updateUserName);
    // this.router.put('/updateEmail/:id', this.userController.updateEmail);
    // this.router.put('/updatePassword/:id', this.userController.updatePassword);
    // this.router.post('/login', this.userController.login);
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = new UserRouter().getRoutes();
