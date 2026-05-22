import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral das suas finanças neste mês</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card">
          <div className="stat-card-title">
            Saldo Atual
            <DollarSign size={20} className="text-success" />
          </div>
          <div className="stat-card-value text-success">
            R$ 2.450,00
          </div>
        </div>

        <div className="card">
          <div className="stat-card-title">
            Entradas
            <ArrowUpRight size={20} className="text-success" />
          </div>
          <div className="stat-card-value">
            R$ 4.800,00
          </div>
        </div>

        <div className="card">
          <div className="stat-card-title">
            Saídas
            <ArrowDownRight size={20} className="text-danger" />
          </div>
          <div className="stat-card-value">
            R$ 2.350,00
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Últimas Transações</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Salário mensal</td>
                <td>Renda</td>
                <td>05/04/2025</td>
                <td className="text-success">+ R$ 4.500,00</td>
                <td><span className="badge badge-entrada">Entrada</span></td>
              </tr>
              <tr>
                <td>Supermercado</td>
                <td>Alimentação</td>
                <td>08/04/2025</td>
                <td className="text-danger">- R$ 650,00</td>
                <td><span className="badge badge-saida">Saída</span></td>
              </tr>
              <tr>
                <td>Conta de Luz</td>
                <td>Moradia</td>
                <td>10/04/2025</td>
                <td className="text-danger">- R$ 180,00</td>
                <td><span className="badge badge-saida">Saída</span></td>
              </tr>
              <tr>
                <td>Freelance Design</td>
                <td>Renda Extra</td>
                <td>12/04/2025</td>
                <td className="text-success">+ R$ 300,00</td>
                <td><span className="badge badge-entrada">Entrada</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
