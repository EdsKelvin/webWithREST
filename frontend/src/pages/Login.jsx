import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, LogIn, AlertCircle } from 'lucide-react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const data = await authAPI.login(email, senha);
      login(data.token, data.usuario);
      navigate('/dashboard');
    } catch (error) {
      setErro(error.erro || 'Erro ao fazer login. Tente novamente.');
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
          <p className="page-subtitle">Acesse sua conta para gerenciar suas finanças</p>
        </div>

        {erro && (
          <div className="alert-erro animate-fade-in">
            <AlertCircle size={18} />
            {erro}
          </div>
        )}

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
              disabled={carregando}
            />
          </div>

          <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem' }} disabled={carregando}>
            <LogIn size={20} />
            {carregando ? 'Entrando...' : 'Entrar'}
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
