import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { authAPI } from '../services/api';

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      await authAPI.cadastro(nome, email, senha);
      setSucesso('Conta criada com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      if (error.detalhes) {
        setErro(error.detalhes.join('. '));
      } else {
        setErro(error.erro || 'Erro ao cadastrar. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <div className="auth-logo">
            <Wallet size={36} />
            FinançaFácil
          </div>
          <p className="page-subtitle">Crie sua conta para começar</p>
        </div>

        {erro && (
          <div className="alert-erro animate-fade-in">
            <AlertCircle size={18} />
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="alert-sucesso animate-fade-in">
            <CheckCircle size={18} />
            {sucesso}
          </div>
        )}

        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={carregando}
            />
          </div>
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={carregando}
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
              disabled={carregando}
            />
          </div>

          <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem' }} disabled={carregando}>
            <UserPlus size={20} />
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Já tem uma conta? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
