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
    this.router.post('/login', this.login.bind(this));
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Consulta o usuário com base no email fornecido
      const user = await this.authModel.login(req, res);

      // Verifica se o usuário existe
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      // Verifica a senha
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        console.log('Senha incorreta');
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      // Se as credenciais forem válidas, você pode criar um token de autenticação JWT ou estabelecer uma sessão de autenticação aqui.
       res.status(200).send({token});
    } catch (error) {
      res.status(400).json({ error: 'Erro na autenticação' });
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
        res.status(401).json({ error: 'Erro na autenticação' });
      }
  }
}

module.exports = AuthController;