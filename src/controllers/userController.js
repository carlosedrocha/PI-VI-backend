const userModel = require('../models/userModel');
const express = require('express')

class UserController {
  constructor() {
    this.router = express.Router();
    // this.setupRoutes();
  }

  // setupRoutes() {
  //   this.router.post('/create', this.createUser);
  //   this.router.get('/all', this.selectUsers);
  //   this.router.delete('/delete/:id', this.deleteUser);
  //   this.router.put('/updateUserName/:id', this.updateUserName);
  //   this.router.put('/updateEmail/:id', this.updateEmail);
  //   this.router.put('/updatePassword/:id', this.updatePassword);
  //   this.router.post('/login', this.login);
  // }

  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await userModel.createUser({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar usuário' });
    }
  }

  async selectUsers(req, res) {
    try {
      const users = await userModel.selectUsers();
      res.json(users);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await userModel.deleteUser(id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateUserName(req, res) {
    try {
      const id = req.params.id;
      const { username } = req.body;
      const user = await userModel.updateUserName(id, username);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro interno do servidor' }); 
    }
  }

  async updateEmail(req, res) {
    try {
      const id = req.params.id;
      const { email } = req.body;
      const user = await userModel.updateEmail(id, email);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro interno do servidor' });
    }
  }

  async updatePassword(req, res) {
    try {
      const id = req.params.id;
      const { password } = req.body;
      const user = await userModel.updatePassword(id, password);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro interno do servidor' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userModel.login(username, password);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = UserController;