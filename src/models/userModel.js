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

async function deleteUser(id) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }
  catch (error) {
    throw new Error('Erro interno do servidor');
  }
  finally {
    await prisma.$disconnect();
  }
}

async function updateUserName(id, username) {
  try {
    if (!username) {
      throw new Error('Username cannot be null or empty');
    }
    
    const user = await prisma.user.update({
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
    await prisma.$disconnect();
  }
}

async function updateEmail(id, email) {
  try {
    if (!email) {
      throw new Error('Email cannot be null or empty');
    }

    const user = await prisma.user.update({
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
    await prisma.$disconnect();
  }
}

async function updatePassword(id, password) {
  try {
    if (!password) {
      throw new Error('Password cannot be null or empty');
    }

    const user = await prisma.user.update({
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
    await prisma.$disconnect();
  }
}

async function login(username, password) {
  try {
    if (!username) {
      throw new Error('Username cannot be null or empty');
    }
    if (!password) {
      throw new Error('Password cannot be null or empty');
    }
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        hashedPassword: password,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Erro interno do servidor');
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createUser,
  selectUsers,
  deleteUser,
  updateUserName,
  updateEmail,
  updatePassword,
  login
};
