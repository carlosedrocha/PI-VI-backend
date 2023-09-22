// controllers/user.controller.js

const userModel = require('../models/userModel');

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.createUser({ username, email, password });
    res.status(201).json(user);
  } catch(error) {

    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
}

async function selectUser(req, res){
  try {
    const users = await userModel.selectUsers();
    res.json(users);
  }
  catch(error) {
    
    res.status(400).json({ error: 'Erro interno do servidor' });
  }
}

async function deleteUser(req, res){
  try {
    const id = req.params.id;
    const user = await userModel.deleteUser(id);
    res.json(user);
  }
  catch(error) {
    
    res.status(400).json({ error: 'Erro interno do servidor' });
  }
}

async function updateUserName(req, res){
  try {
    const id = req.params.id;
    const { username } = req.body;
    const user = await userModel.updateUserName(id, username);
    res.json(user);
  }
  catch(error) {
    
    res.status(400).json({ error: 'Erro interno do servidor' });
  }
}

async function updateEmail(req, res){
  try {
    const id = req.params.id;
    const { email } = req.body;
    const user = await userModel.updateEmail(id, email);
    res.json(user);
  }
  catch(error) {
    
    res.status(400).json({ error: 'Erro interno do servidor' });
  }
}

async function updatePassword(req, res){
  try {
    const id = req.params.id;
    const { password } = req.body;
    const user = await userModel.updatePassword(id,password);
    res.json(user);
  }
  catch(error) {
    res.status(400).json({ error: 'Erro interno do servidor' });
  }
}

async function login(req, res){
  try {
    const { username, password } = req.body;
    const user = await userModel.login(username, password);
    res.json(user);
  }
  catch(error) {
    res.status(400).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  createUser,
  selectUser,
  deleteUser,
  updateUserName,
  updateEmail,
  updatePassword,
  login
};
