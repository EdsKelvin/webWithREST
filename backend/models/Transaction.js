const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório']
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true,
    minlength: [2, 'Descrição deve ter pelo menos 2 caracteres']
  },
  valor: {
    type: Number,
    required: [true, 'Valor é obrigatório'],
    min: [0.01, 'Valor deve ser maior que zero']
  },
  tipo: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: {
      values: ['entrada', 'saida'],
      message: 'Tipo deve ser "entrada" ou "saida"'
    }
  },
  categoria: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    trim: true
  },
  data: {
    type: Date,
    required: [true, 'Data é obrigatória']
  }
}, {
  timestamps: true
});

// Index composto para buscar transações do usuário ordenadas por data
transactionSchema.index({ usuario: 1, data: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
