  const UserModel = require('../models/userModel');
  const express = require('express')
  const router = express.Router();

  class UserController {
    constructor() {
      this.router = router;
      this.setupRoutes();
      this.userModel = new UserModel()
    }

    setupRoutes() {
      this.router.post('/create', this.createUser.bind(this));
      this.router.get('/all', this.selectUsers.bind(this));
      this.router.delete('/delete/:id', this.deleteUser.bind(this));
      this.router.put('/updateUserName/:id', this.updateUserName.bind(this));
      this.router.put('/updateEmail/:id', this.updateEmail.bind(this));
      this.router.put('/updatePassword/:id', this.updatePassword.bind(this));
      this.router.post('/login', this.login.bind(this));
    }

    async createUser(req, res) {
      try {
        const { username, email, password } = req.body;
        const user = await this.userModel.createUser({ username, email, password });
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário' });
      }
    }

    async selectUsers(req, res) {
      try {
        const users = await this.userModel.selectUsers();
        res.json(users);
      } catch (error) {
        res.status(400).json({ error: error });
      }
    }

    async deleteUser(req, res) {
      try {
        const id = req.params.id;
        const user = await this.userModel.deleteUser(id);
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: 'Erro interno do servidor' });
      }
    }

    async updateUserName(req, res) {
      try {
        const id = req.params.id;
        const { username } = req.body;
        const user = await this.userModel.updateUserName(id, username);
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: 'Erro interno do servidor' }); 
      }
    }

    async updateEmail(req, res) {
      try {
        const id = req.params.id;
        const { email } = req.body;
        const user = await this.userModel.updateEmail(id, email);
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: 'Erro interno do servidor' });
      }
    }

    async updatePassword(req, res) {
      try {
        const id = req.params.id;
        const { password } = req.body;
        const user = await this.userModel.updatePassword(id, password);
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: 'Erro interno do servidor' });
      }
    }

    async login(req, res) {
      try {
        const { username, password } = req.body;
        const user = await this.userModel.login(username, password);
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: 'Erro interno do servidor' });
      }
    }
  }

  module.exports = UserController;