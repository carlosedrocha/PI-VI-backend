// controllers/user.controller.js

const userModel = require('../models/userModel');

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.createUser({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
}

async function selectUser(req, res){
  try {
    const users = await userModel.selectUsers();
    res.json(users);
  }
  catch {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  createUser,
  selectUser
};
