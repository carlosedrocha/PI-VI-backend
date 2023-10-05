const AuthModel = require('../models/authModel');
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

class AuthController {
  constructor() {
    this.router = router;
    this.setupRoutes();
    this.authModel = new AuthModel();
  }

  setupRoutes() {
    this.router.post('/auth/login', this.login.bind(this));
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
  
      console.log('Email recebido:', email);
  
      // Consulta o usuário com base no email fornecido
      const user = await user.findByEmail(email);
  
      console.log('Usuário encontrado:', user);
  
      // Verifica se o usuário existe
      if (!user) {
        console.log('Usuário não encontrado');
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      // Verifica a senha
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      console.log('Comparação de senha:', passwordMatch);
  
      if (!passwordMatch) {
        console.log('Senha incorreta');
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      // Se as credenciais forem válidas, você pode criar um token de autenticação JWT ou estabelecer uma sessão de autenticação aqui.
  
      res.json({ message: 'Autenticação bem-sucedida' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro na autenticação' });
    }
  }

  async verifyJWT(req, res, next) {
    try {
      const token = req.headers['authorization'];
      if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
       
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
       if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        
       // se tudo estiver ok, salva no request para uso posterior
       req.userId = decoded.id;
       next();
      });
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Erro na autenticação' });
      }
  }
}

module.exports = AuthController;