// models/user.model.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser({ username, email, password }) {
  console.log('Creating user...');
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword: password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Função para consultar todos os usuários

async function selectUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  }
  catch (error) {
    console.error('Erro ao buscar os usuários', error);
    throw new Error('Erro interno do servidor');
  }
  finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  createUser,
  selectUsers
};
