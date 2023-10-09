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
async function getUser({username}) {
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
};
