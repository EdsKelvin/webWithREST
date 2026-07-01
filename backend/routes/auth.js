const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Função para gerar token JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/cadastro
// @desc    Cadastrar novo usuário
// @access  Public
router.post('/cadastro', [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('E-mail é obrigatório')
    .isEmail().withMessage('Formato de e-mail inválido'),
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        erro: 'Dados inválidos',
        detalhes: errors.array().map(e => e.msg)
      });
    }

    const { nome, email, senha } = req.body;

    // Verificar se o e-mail já está em uso
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        erro: 'Este e-mail já está cadastrado.' 
      });
    }

    // Criar novo usuário
    const usuario = await User.create({ nome, email, senha });

    // Retornar token
    res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      token: gerarToken(usuario._id),
      usuario: usuario.toJSON()
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// @route   POST /api/auth/login
// @desc    Autenticar usuário e retornar token
// @access  Public
router.post('/login', [
  body('email')
    .trim()
    .notEmpty().withMessage('E-mail é obrigatório')
    .isEmail().withMessage('Formato de e-mail inválido'),
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        erro: 'Dados inválidos',
        detalhes: errors.array().map(e => e.msg)
      });
    }

    const { email, senha } = req.body;

    // Buscar usuário pelo e-mail
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ 
        erro: 'E-mail ou senha inválidos.' 
      });
    }

    // Verificar senha
    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ 
        erro: 'E-mail ou senha inválidos.' 
      });
    }

    // Retornar token
    res.json({
      mensagem: 'Login realizado com sucesso!',
      token: gerarToken(usuario._id),
      usuario: usuario.toJSON()
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

module.exports = router;
