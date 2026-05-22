import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const NovaTransacao = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('saida');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/transacoes');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Nova Transação</h1>
          <p className="page-subtitle">Adicione uma nova entrada ou saída</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/transacoes')}>
          <ArrowLeft size={18} />
          Voltar
        </button>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Tipo de Transação</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className={`btn-secondary ${tipo === 'entrada' ? 'active' : ''}`}
                style={{ flex: 1, borderColor: tipo === 'entrada' ? 'var(--success-color)' : '', color: tipo === 'entrada' ? 'var(--success-color)' : '' }}
                onClick={() => setTipo('entrada')}
              >
                Entrada
              </button>
              <button
                type="button"
                className={`btn-secondary ${tipo === 'saida' ? 'active' : ''}`}
                style={{ flex: 1, borderColor: tipo === 'saida' ? 'var(--danger-color)' : '', color: tipo === 'saida' ? 'var(--danger-color)' : '' }}
                onClick={() => setTipo('saida')}
              >
                Saída
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <input type="text" className="input-field" placeholder="Ex: Conta de Luz" required />
          </div>

          <div className="input-group">
            <label>Valor (R$)</label>
            <input type="number" step="0.01" className="input-field" placeholder="0.00" required />
          </div>

          <div className="input-group">
            <label>Data</label>
            <input type="date" className="input-field" required />
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select className="input-field" required>
              <option value="">Selecione uma categoria...</option>
              {tipo === 'entrada' ? (
                <>
                  <option value="renda">Renda Fixa</option>
                  <option value="freelance">Freelance</option>
                  <option value="rendimentos">Rendimentos</option>
                </>
              ) : (
                <>
                  <option value="alimentacao">Alimentação</option>
                  <option value="moradia">Moradia</option>
                  <option value="transporte">Transporte</option>
                  <option value="lazer">Lazer</option>
                </>
              )}
            </select>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/transacoes')}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Save size={18} />
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NovaTransacao;
