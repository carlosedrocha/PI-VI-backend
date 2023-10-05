const { PrismaClient } = require('@prisma/client');

const express = require('express')

class UserModel {
  constructor() {
    this.router = express.Router();
    this.prisma = new PrismaClient();
    this.setupRoutes();
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