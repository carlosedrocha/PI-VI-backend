const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

class AuthModel {
    constructor() {
        this.router = express.Router();
        this.prisma = new PrismaClient();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/login', this.login.bind(this));
    }

    async login(req, res, next) {
        console.log()
        try {
            const { email, password } = req.body;

            // Verifique as credenciais do usuário no seu banco de dados
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            console.log(password, ":", user.hashedPassword);

            if (password && user.hashedPassword) {
                const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Credenciais inválidas' });
                }
            }

            // Autenticação bem-sucedida, gere um token JWT
            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 1500 // expira em 5 minutos
            });

            // Envie a resposta JSON de sucesso
            return res.status(200).json({
                token,
                message: 'Autenticação bem-sucedida'
            });
        } catch (error) {
            console.error(error);
            // Envie a resposta JSON de erro
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

module.exports = AuthModel;
