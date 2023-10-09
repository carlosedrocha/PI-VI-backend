// controllers/user.controller.js

const userModel = require('../models/userModel');

async function createUser(req, res) {
  console.log('Chegou?...');
  try {
    const { username, email, password } = req.body;
    const user = await userModel.createUser({ username, email, password });
    res.status(201).json(user);
    console.log('Chegou?...');
  } catch (error) {
    console.error(error);
        console.log('Chegou?.');

    // console.log(`here`, req.body);
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
}

async function getUser(req, res) {
  console.log('Chegou?...');
  try {
    const user = await userModel.getUser({ username: req.params.username });
    res.status(200).json(user);
    console.log('Chegou?...');
  } catch (error) {
    console.error(error);
        console.log('Chegou?.');
  }
}

module.exports = {
  createUser,
  getUser,
};
