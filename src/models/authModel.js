const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const  verifyPassword = require('../helpers/password');
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
        try {
            const { email, password } = req.body;

            // Verifique as credenciais do usuário no seu banco de dados
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error("Usuario nao encontrado, verifique as credenciais")
                // return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            console.log(password, ":", user.hashedPassword);

            if (password && user.hashedPassword) {
                const passwordMatch = await verifyPassword(password, user.hashedPassword);
                
                if (!passwordMatch) {
                    throw new Error("Credenciais inválidas", Error);                   
                }
            }

            // Autenticação bem-sucedida, gere um token JWT
            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 1500 // expira em 5 minutos
            });
            return token;
       
        } catch (error) {
            console.error(error);
            // Envie a resposta JSON de erro
            throw new Error("Erro nao tratado: ", error.message)
            // return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

module.exports = AuthModel;
