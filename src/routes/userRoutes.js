const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

class UserRouter {
  constructor() {
    this.router = router;
    this.userController = new userController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/all', this.userController.selectUsers.bind(this));
     this.router.post('/create', this.userController.createUser.bind(this));
     this.router.delete('/delete/:id', this.userController.deleteUser.bind(this));
     this.router.put('/updateEmail/:id', this.userController.updateEmail.bind(this));
    //  this.router.put('/updatePassword/:id', this.userController.updatePassword);
    //  this.router.post('/login', this.userController.login);
     
  }

  getRoutes() {
    return this.router;
    
  }
}

module.exports = new UserRouter().getRoutes();
