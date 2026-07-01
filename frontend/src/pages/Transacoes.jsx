import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Pencil, Trash2, Loader, X, Save, AlertCircle } from 'lucide-react';
import { transacoesAPI } from '../services/api';

const Transacoes = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [deletando, setDeletando] = useState(null);
  const [editando, setEditando] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const carregarTransacoes = async () => {
    try {
      const data = await transacoesAPI.listar();
      setTransacoes(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) return;

    setDeletando(id);
    try {
      await transacoesAPI.deletar(id);
      setTransacoes(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      alert(error.erro || 'Erro ao excluir transação.');
    } finally {
      setDeletando(null);
    }
  };

  const iniciarEdicao = (transacao) => {
    setEditando(transacao._id);
    setFormEdicao({
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoria: transacao.categoria,
      data: transacao.data.split('T')[0]
    });
    setErro('');
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setFormEdicao({});
    setErro('');
  };

  const salvarEdicao = async (id) => {
    setErro('');
    try {
      const { transacao } = await transacoesAPI.atualizar(id, formEdicao);
      setTransacoes(prev => prev.map(t => t._id === id ? transacao : t));
      setEditando(null);
      setFormEdicao({});
    } catch (error) {
      if (error.detalhes) {
        setErro(error.detalhes.join('. '));
      } else {
        setErro(error.erro || 'Erro ao atualizar transação.');
      }
    }
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatarData = (dataStr) => {
    return new Date(dataStr).toLocaleDateString('pt-BR');
  };

  const filtradas = transacoes.filter(t =>
    t.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    t.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size={32} className="spinner" style={{ color: 'var(--primary-color)' }} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transações</h1>
          <p className="page-subtitle">Gerencie todas as suas entradas e saídas</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Buscar transação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>

      {erro && (
        <div className="alert-erro animate-fade-in" style={{ marginBottom: '1rem' }}>
          <AlertCircle size={18} />
          {erro}
        </div>
      )}

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(t => (
                <tr key={t._id}>
                  {editando === t._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          value={formEdicao.descricao}
                          onChange={(e) => setFormEdicao({ ...formEdicao, descricao: e.target.value })}
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          value={formEdicao.categoria}
                          onChange={(e) => setFormEdicao({ ...formEdicao, categoria: e.target.value })}
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="input-field"
                          value={formEdicao.data}
                          onChange={(e) => setFormEdicao({ ...formEdicao, data: e.target.value })}
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          className="input-field"
                          value={formEdicao.valor}
                          onChange={(e) => setFormEdicao({ ...formEdicao, valor: parseFloat(e.target.value) || 0 })}
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem', width: '100px' }}
                        />
                      </td>
                      <td>
                        <select
                          className="input-field"
                          value={formEdicao.tipo}
                          onChange={(e) => setFormEdicao({ ...formEdicao, tipo: e.target.value })}
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
                        >
                          <option value="entrada">Entrada</option>
                          <option value="saida">Saída</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            style={{ color: 'var(--success-color)', padding: '4px' }}
                            title="Salvar"
                            onClick={() => salvarEdicao(t._id)}
                          >
                            <Save size={18} />
                          </button>
                          <button
                            style={{ color: 'var(--text-secondary)', padding: '4px' }}
                            title="Cancelar"
                            onClick={cancelarEdicao}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{t.descricao}</td>
                      <td>{t.categoria}</td>
                      <td>{formatarData(t.data)}</td>
                      <td className={t.tipo === 'entrada' ? 'text-success' : 'text-danger'}>
                        {t.tipo === 'entrada' ? '+' : '-'} R$ {formatarValor(t.valor)}
                      </td>
                      <td>
                        <span className={`badge badge-${t.tipo}`}>
                          {t.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            style={{ color: 'var(--text-secondary)', padding: '4px' }}
                            title="Editar"
                            onClick={() => iniciarEdicao(t)}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            style={{ color: 'var(--danger-color)', padding: '4px' }}
                            title="Excluir"
                            onClick={() => handleDeletar(t._id)}
                            disabled={deletando === t._id}
                          >
                            {deletando === t._id ? <Loader size={18} className="spinner" /> : <Trash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filtradas.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transacoes;
