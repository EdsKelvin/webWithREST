# FinançaFácil

## 👥 Integrantes do Grupo
- Edson Kelvin laurindo araujo

## 💡 Descrição da Ideia do Sistema
O **FinançaFácil** é um sistema web de controle de finanças pessoais. O problema principal que ele resolve é a falta de visibilidade sobre para onde o dinheiro vai no fim do mês. Muitas pessoas gastam sem registrar e acabam se surpreendendo com o saldo negativo.

O sistema permite registrar entradas e saídas financeiras, categorizar os gastos e visualizar o saldo atual de forma simples e intuitiva, tudo em um único lugar.

## 🚀 Tecnologias Utilizadas
**Fase atual (Frontend):**
- React
- Vite
- React Router DOM (para navegação entre as telas)
- Lucide React (para ícones)
- CSS Vanilla (Design moderno, Dark Mode e animações)

**Previsto para o Backend (próxima fase):**
- Node.js + Express
- MongoDB (Mongoose)
- JWT (Autenticação)

## 📱 Explicação das Telas Desenvolvidas (Mockadas)
Nesta etapa, focamos na construção da base visual do sistema, simulando seu funcionamento sem a integração com o backend real.
1. **Tela de Login:** Interface limpa e minimalista onde o usuário insere e-mail e senha para acessar o sistema.
   * **⚠️ Conta para Teste (Mock):** Como a aplicação ainda não possui integração com o backend/banco de dados, a autenticação é apenas visual. Para testar o acesso, preencha os campos com **qualquer valor** (Exemplo - E-mail: `teste@teste.com` / Senha: `123456`) e clique em "Entrar".
2. **Dashboard (Tela Inicial):** Exibe um resumo geral das finanças do mês, incluindo o Saldo Atual, Total de Entradas e Total de Saídas. Conta também com um gráfico ou indicador visual do balanço financeiro.
3. **Listagem de Transações:** Exibe a tabela detalhada de transações (entradas e saídas) do mês com ícones indicativos, categorias e valores formatados.
4. **Cadastro de Transação:** Formulário amigável para o usuário adicionar uma nova entrada ou saída, permitindo selecionar descrição, valor, tipo e categoria.

## 📂 Organização das Pastas do Projeto
O projeto está dividido na seguinte estrutura principal:
```
finance_management/
├── frontend/                  # Aplicação Web (React)
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis (Layout, Sidebar, Cards)
│   │   ├── pages/             # Telas da aplicação (Login, Dashboard, Listagem, Cadastro)
│   │   ├── styles/            # Arquivos de estilo (CSS)
│   │   ├── App.jsx            # Configuração de rotas (React Router)
│   │   └── main.jsx           # Ponto de entrada do React
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## ⚙️ Instruções para Rodar o Projeto (Frontend)

Siga os passos abaixo para iniciar a aplicação localmente:

1. Abra o terminal na pasta raiz do projeto.
2. Navegue para a pasta do frontend:
   ```bash
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse no navegador o link gerado (normalmente `http://localhost:5173`).
