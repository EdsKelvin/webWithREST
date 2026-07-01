const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Todas as rotas abaixo exigem autenticação
router.use(auth);

// Validações compartilhadas para criação/edição
const validacoes = [
  body('descricao')
    .trim()
    .notEmpty().withMessage('Descrição é obrigatória')
    .isLength({ min: 2 }).withMessage('Descrição deve ter pelo menos 2 caracteres'),
  body('valor')
    .notEmpty().withMessage('Valor é obrigatório')
    .isFloat({ min: 0.01 }).withMessage('Valor deve ser maior que zero'),
  body('tipo')
    .notEmpty().withMessage('Tipo é obrigatório')
    .isIn(['entrada', 'saida']).withMessage('Tipo deve ser "entrada" ou "saida"'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('Categoria é obrigatória'),
  body('data')
    .notEmpty().withMessage('Data é obrigatória')
    .isISO8601().withMessage('Formato de data inválido')
];

// @route   GET /api/transacoes/resumo
// @desc    Obter resumo financeiro (saldo, entradas, saídas)
// @access  Private
router.get('/resumo', async (req, res) => {
  try {
    const transacoes = await Transaction.find({ usuario: req.usuarioId });

    const entradas = transacoes
      .filter(t => t.tipo === 'entrada')
      .reduce((acc, t) => acc + t.valor, 0);

    const saidas = transacoes
      .filter(t => t.tipo === 'saida')
      .reduce((acc, t) => acc + t.valor, 0);

    res.json({
      saldo: entradas - saidas,
      entradas,
      saidas,
      totalTransacoes: transacoes.length
    });
  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// @route   GET /api/transacoes
// @desc    Listar todas as transações do usuário
// @access  Private
router.get('/', async (req, res) => {
  try {
    const transacoes = await Transaction.find({ usuario: req.usuarioId })
      .sort({ data: -1 })
      .lean();

    res.json(transacoes);
  } catch (error) {
    console.error('Erro ao listar transações:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// @route   GET /api/transacoes/:id
// @desc    Buscar transação por ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const transacao = await Transaction.findOne({
      _id: req.params.id,
      usuario: req.usuarioId
    });

    if (!transacao) {
      return res.status(404).json({ erro: 'Transação não encontrada.' });
    }

    res.json(transacao);
  } catch (error) {
    console.error('Erro ao buscar transação:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// @route   POST /api/transacoes
// @desc    Criar nova transação
// @access  Private
router.post('/', validacoes, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erro: 'Dados inválidos',
        detalhes: errors.array().map(e => e.msg)
      });
    }

    const { descricao, valor, tipo, categoria, data } = req.body;

    const transacao = await Transaction.create({
      usuario: req.usuarioId,
      descricao,
      valor,
      tipo,
      categoria,
      data
    });

    res.status(201).json({
      mensagem: 'Transação criada com sucesso!',
      transacao
    });
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// @route   PUT /api/transacoes/:id
// @desc    Atualizar transação
// @access  Private
router.put('/:id', validacoes, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erro: 'Dados inválidos',
        detalhes: errors.array().map(e => e.msg)
      });
    }

    const { descricao, valor, tipo, categoria, data } = req.body;

    const transacao = await Transaction.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      { descricao, valor, tipo, categoria, data },
      { new: true, runValidators: true }
    );

    if (!transacao) {
      return res.status(404).json({ erro: 'Transação não encontrada.' });
    }

    res.json({
      mensagem: 'Transação atualizada com sucesso!',
      transacao
    });
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// @route   DELETE /api/transacoes/:id
// @desc    Deletar transação
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const transacao = await Transaction.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuarioId
    });

    if (!transacao) {
      return res.status(404).json({ erro: 'Transação não encontrada.' });
    }

    res.json({ mensagem: 'Transação excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

module.exports = router;
