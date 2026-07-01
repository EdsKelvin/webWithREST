import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Loader } from 'lucide-react';
import { transacoesAPI } from '../services/api';

const Dashboard = () => {
  const [resumo, setResumo] = useState({ saldo: 0, entradas: 0, saidas: 0 });
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resumoData, transacoesData] = await Promise.all([
        transacoesAPI.resumo(),
        transacoesAPI.listar()
      ]);
      setResumo(resumoData);
      setTransacoes(transacoesData.slice(0, 5)); // Últimas 5 transações
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatarData = (dataStr) => {
    return new Date(dataStr).toLocaleDateString('pt-BR');
  };

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
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral das suas finanças</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card">
          <div className="stat-card-title">
            Saldo Atual
            <DollarSign size={20} className={resumo.saldo >= 0 ? 'text-success' : 'text-danger'} />
          </div>
          <div className={`stat-card-value ${resumo.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
            R$ {formatarValor(resumo.saldo)}
          </div>
        </div>

        <div className="card">
          <div className="stat-card-title">
            Entradas
            <ArrowUpRight size={20} className="text-success" />
          </div>
          <div className="stat-card-value">
            R$ {formatarValor(resumo.entradas)}
          </div>
        </div>

        <div className="card">
          <div className="stat-card-title">
            Saídas
            <ArrowDownRight size={20} className="text-danger" />
          </div>
          <div className="stat-card-value">
            R$ {formatarValor(resumo.saidas)}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Últimas Transações</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.length > 0 ? (
                transacoes.map(t => (
                  <tr key={t._id}>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Nenhuma transação encontrada. Comece adicionando uma!
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

export default Dashboard;
