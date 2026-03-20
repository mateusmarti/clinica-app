import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Cadastro
export const register = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await User.create({
      nome,
      email,
      senha: senhaHash,
      tipo
    });

    res.status(201).json({ msg: 'Usuário criado com sucesso' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(400).json({ msg: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};