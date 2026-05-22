import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PlusCircle, LogOut, Wallet } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Wallet size={28} />
        <span>FinançaFácil</span>
      </div>

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
        <NavLink to="/login" className="nav-link" style={{ color: 'var(--danger-color)' }}>
          <LogOut size={20} />
          Sair
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
