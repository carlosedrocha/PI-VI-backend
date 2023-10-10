<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const userRoutes = router.post('/create', userController.createUser);
const getUser = router.get('/getUser', userController.getUser);
module.exports = userRoutes;
module.exports = getUser;
=======
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); 

class UserRouter {
  constructor() {
    this.router = router;
    this.userController = new UserController(); 
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/all', this.userController.selectUsers.bind(this.userController));
    this.router.post('/create', this.userController.createUser.bind(this.userController));
    this.router.delete('/delete/:id', this.userController.deleteUser.bind(this.userController));
    this.router.put('/updateEmail/:id', this.userController.updateEmail.bind(this.userController));
    // this.router.put('/updatePassword/:id', this.userController.updatePassword);
    // this.router.post('/login', this.userController.login);
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = new UserRouter().getRoutes();
>>>>>>> PedroZ
