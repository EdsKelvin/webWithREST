import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { transacoesAPI } from '../services/api';

const NovaTransacao = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('saida');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await transacoesAPI.criar({
        descricao,
        valor: parseFloat(valor),
        tipo,
        categoria,
        data
      });
      navigate('/transacoes');
    } catch (error) {
      if (error.detalhes) {
        setErro(error.detalhes.join('. '));
      } else {
        setErro(error.erro || 'Erro ao salvar transação.');
      }
    } finally {
      setCarregando(false);
    }
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
        {erro && (
          <div className="alert-erro animate-fade-in" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={18} />
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Tipo de Transação</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className={`btn-secondary ${tipo === 'entrada' ? 'active' : ''}`}
                style={{ flex: 1, borderColor: tipo === 'entrada' ? 'var(--success-color)' : '', color: tipo === 'entrada' ? 'var(--success-color)' : '' }}
                onClick={() => { setTipo('entrada'); setCategoria(''); }}
              >
                Entrada
              </button>
              <button
                type="button"
                className={`btn-secondary ${tipo === 'saida' ? 'active' : ''}`}
                style={{ flex: 1, borderColor: tipo === 'saida' ? 'var(--danger-color)' : '', color: tipo === 'saida' ? 'var(--danger-color)' : '' }}
                onClick={() => { setTipo('saida'); setCategoria(''); }}
              >
                Saída
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ex: Conta de Luz"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              disabled={carregando}
            />
          </div>

          <div className="input-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="input-field"
              placeholder="0.00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              disabled={carregando}
            />
          </div>

          <div className="input-group">
            <label>Data</label>
            <input
              type="date"
              className="input-field"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
              disabled={carregando}
            />
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select
              className="input-field"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              disabled={carregando}
            >
              <option value="">Selecione uma categoria...</option>
              {tipo === 'entrada' ? (
                <>
                  <option value="Renda Fixa">Renda Fixa</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Rendimentos">Rendimentos</option>
                  <option value="Renda Extra">Renda Extra</option>
                </>
              ) : (
                <>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Moradia">Moradia</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                </>
              )}
            </select>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/transacoes')} disabled={carregando}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={carregando}>
              <Save size={18} />
              {carregando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NovaTransacao;
