const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Email recebido:', email);

    // Consulta o usuário com base no email fornecido
    const user = await User.findByEmail(email);

    console.log('Usuário encontrado:', user);

    // Verifica se o usuário existe
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('Comparação de senha:', passwordMatch);

    if (!passwordMatch) {
      console.log('Senha incorreta');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Se as credenciais forem válidas, você pode criar um token de autenticação JWT ou estabelecer uma sessão de autenticação aqui.

    res.json({ message: 'Autenticação bem-sucedida' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro na autenticação' });
  }
};
