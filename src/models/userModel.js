const { PrismaClient } = require('@prisma/client');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

class UserModel {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
    this.prisma = new PrismaClient();

    this.setupRoutes();
    this.setupSocket();
  }

  setupRoutes() {
    this.app.post('/create', this.createUser.bind(this));
    this.app.get('/all', this.selectUsers.bind(this));
    this.app.delete('/delete/:id', this.deleteUser.bind(this));
    this.app.put('/updateUserName/:id', this.updateUserName.bind(this));
    this.app.put('/updateEmail/:id', this.updateEmail.bind(this));
    this.app.put('/updatePassword/:id', this.updatePassword.bind(this));
    this.app.post('/login', this.login.bind(this));
  }

  setupSocket() {
    this.io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('login', async ({ username, password }) => {
        try {
          const user = await this.login(username, password);
          if (user) {
            // Success
            socket.emit('login-success', user);
          } else {
            // Failure
            socket.emit('login-fail', { message: 'Invalid credentials' });
          }
        } catch (error) {
          // Error
          socket.emit('login-error', { message: 'Error during login' });
        }
      });
    });

    const PORT = process.env.PORT || 3001;
    this.server.listen(PORT);
    console.log(`Socket server running at http://localhost:${PORT}`);
  }

  async createUser({ username, email, password }) {
    console.log('Creating user...');
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          email,
          hashedPassword: password,
        },
      });
      return user;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async selectUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Erro ao buscar os usuários', error);
      throw new Error('Erro interno do servidor');
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro interno do servidor');
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async updateUserName(id, username) {
    try {
      if (!username) {
        throw new Error('Username cannot be null or empty');
      }

      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro interno do servidor');
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async updateEmail(id, email) {
    try {
      if (!email) {
        throw new Error('Email cannot be null or empty');
      }

      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro interno do servidor');
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async updatePassword(id, password) {
    try {
      if (!password) {
        throw new Error('Password cannot be null or empty');
      }

      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          hashedPassword: password,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro interno do servidor');
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async login(username, password) {
    try {
      if (!username) {
        throw new Error('Username cannot be null or empty');
      }
      if (!password) {
        throw new Error('Password cannot be null or empty');
      }
      const user = await this.prisma.user.findFirst({
        where: {
          username: username,
          hashedPassword: password,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro interno do servidor');
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

module.exports = UserModel;