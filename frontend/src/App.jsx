import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';
import NovaTransacao from './pages/NovaTransacao';

const AppLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/transacoes" element={<AppLayout><Transacoes /></AppLayout>} />
        <Route path="/nova-transacao" element={<AppLayout><NovaTransacao /></AppLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
