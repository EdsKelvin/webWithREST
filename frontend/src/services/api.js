const API_BASE = '/api';

// Helper para fazer requisições autenticadas
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, ...data };
  }

  return data;
};

// ========== AUTH ==========

export const authAPI = {
  login: (email, senha) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),

  cadastro: (nome, email, senha) =>
    fetchAPI('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    }),
};

// ========== TRANSAÇÕES ==========

export const transacoesAPI = {
  listar: () =>
    fetchAPI('/transacoes'),

  buscar: (id) =>
    fetchAPI(`/transacoes/${id}`),

  criar: (transacao) =>
    fetchAPI('/transacoes', {
      method: 'POST',
      body: JSON.stringify(transacao),
    }),

  atualizar: (id, transacao) =>
    fetchAPI(`/transacoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transacao),
    }),

  deletar: (id) =>
    fetchAPI(`/transacoes/${id}`, {
      method: 'DELETE',
    }),

  resumo: () =>
    fetchAPI('/transacoes/resumo'),
};
