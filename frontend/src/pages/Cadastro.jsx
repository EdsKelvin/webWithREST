import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, UserPlus } from 'lucide-react';

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();
    if (nome && email && senha) {
      navigate('/login');
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
            />
          </div>

          <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem' }}>
            <UserPlus size={20} />
            Cadastrar
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
