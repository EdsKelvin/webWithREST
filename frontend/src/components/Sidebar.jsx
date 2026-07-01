import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PlusCircle, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, usuario } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Wallet size={28} />
        <span>FinançaFácil</span>
      </div>

      {usuario && (
        <div style={{ 
          padding: '0.75rem 1rem', 
          marginBottom: '1.5rem', 
          borderRadius: 'var(--radius-sm)', 
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.15)'
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>Logado como</p>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{usuario.nome}</p>
        </div>
      )}

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/transacoes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <ReceiptText size={20} />
          Transações
        </NavLink>
        <NavLink to="/nova-transacao" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <PlusCircle size={20} />
          Nova Transação
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="nav-link" style={{ color: 'var(--danger-color)', width: '100%' }}>
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
