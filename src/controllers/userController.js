// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(
      { username, email, password: hashedPassword },
      (err, userId) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso', userId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};
