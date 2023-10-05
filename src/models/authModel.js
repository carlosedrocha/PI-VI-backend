const { PrismaClient } = require('@prisma/client');

const express = require('express')

class AuthModel {
    constructor() {
        this.router = express.Router();
        this.prisma = new PrismaClient();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/login', this.login.bind(this));
    }
    async login(req, res) {
        try {
        const { username, password } = req.body;
        
        // Verifique as credenciais do usuário no seu banco de dados
        const user = await this.userModel.login(username, password);

        if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Autenticação bem-sucedida, gere um token JWT
        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 300 // expira em 5 minutos
        });

        res.json({ auth: true, token: token });
        } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}   

module.exports = AuthModel;