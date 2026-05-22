import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate auth
    if (email && senha) {
      navigate('/dashboard');
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
          <p className="page-subtitle">Acesse sua conta para gerenciar suas finanças</p>
        </div>

        <form onSubmit={handleLogin}>
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
            <LogIn size={20} />
            Entrar
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Não tem uma conta? <Link to="/cadastro" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
