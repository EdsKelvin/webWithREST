import { useState } from 'react';
import { Search, Filter, Pencil, Trash2 } from 'lucide-react';

const Transacoes = () => {
  const [busca, setBusca] = useState('');

  // Mock data
  const transacoesMock = [
    { id: 1, desc: 'Salário mensal', cat: 'Renda', data: '05/04/2025', valor: 4500, tipo: 'entrada' },
    { id: 2, desc: 'Supermercado', cat: 'Alimentação', data: '08/04/2025', valor: -650, tipo: 'saida' },
    { id: 3, desc: 'Conta de Luz', cat: 'Moradia', data: '10/04/2025', valor: -180, tipo: 'saida' },
    { id: 4, desc: 'Internet', cat: 'Moradia', data: '11/04/2025', valor: -120, tipo: 'saida' },
    { id: 5, desc: 'Freelance Design', cat: 'Renda Extra', data: '12/04/2025', valor: 300, tipo: 'entrada' },
    { id: 6, desc: 'Restaurante', cat: 'Lazer', data: '15/04/2025', valor: -250, tipo: 'saida' },
    { id: 7, desc: 'Uber', cat: 'Transporte', data: '16/04/2025', valor: -45, tipo: 'saida' },
  ];

  const filtradas = transacoesMock.filter(t => t.desc.toLowerCase().includes(busca.toLowerCase()));

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
          <button className="btn-secondary">
            <Filter size={18} />
            Mês atual
          </button>
        </div>
      </div>

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
                <tr key={t.id}>
                  <td>{t.desc}</td>
                  <td>{t.cat}</td>
                  <td>{t.data}</td>
                  <td className={t.tipo === 'entrada' ? 'text-success' : 'text-danger'}>
                    {t.tipo === 'entrada' ? '+' : '-'} R$ {Math.abs(t.valor).toFixed(2).replace('.', ',')}
                  </td>
                  <td>
                    <span className={`badge badge-${t.tipo}`}>
                      {t.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button style={{ color: 'var(--text-secondary)', padding: '4px' }} title="Editar" onClick={() => alert('Modo de edição (Mock)')}>
                        <Pencil size={18} />
                      </button>
                      <button style={{ color: 'var(--danger-color)', padding: '4px' }} title="Excluir" onClick={() => alert('Registro deletado (Mock)')}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
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
