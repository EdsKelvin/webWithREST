import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';
import NovaTransacao from './pages/NovaTransacao';

// Layout com Sidebar para páginas autenticadas
const AppLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

// Componente de rota protegida
const RotaProtegida = ({ children }) => {
  const { estaAutenticado, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="auth-container">
        <div className="auth-card animate-fade-in" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

// Componente de rota pública (redireciona se já autenticado)
const RotaPublica = ({ children }) => {
  const { estaAutenticado, carregando } = useAuth();

  if (carregando) return null;

  if (estaAutenticado) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<RotaPublica><Login /></RotaPublica>} />
          <Route path="/cadastro" element={<RotaPublica><Cadastro /></RotaPublica>} />
          <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
          <Route path="/transacoes" element={<RotaProtegida><Transacoes /></RotaProtegida>} />
          <Route path="/nova-transacao" element={<RotaProtegida><NovaTransacao /></RotaProtegida>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
