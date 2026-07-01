# FinançaFácil

## 👥 Integrantes do Grupo
- Edson Kelvin Laurindo Araújo

## 💡 Descrição da Aplicação
O **FinançaFácil** é um sistema web completo (full-stack) de controle de finanças pessoais. Ele resolve o problema da falta de visibilidade sobre para onde o dinheiro vai no fim do mês.

O sistema permite:
- 📝 Registrar entradas e saídas financeiras
- 🏷️ Categorizar os gastos (Alimentação, Moradia, Transporte, Lazer, etc.)
- 📊 Visualizar o saldo atual, total de entradas e saídas no Dashboard
- 🔐 Autenticação segura com JWT
- ✏️ Editar e excluir transações
- 🔍 Buscar transações por descrição ou categoria

## 🚀 Tecnologias Utilizadas

### Frontend
| Tecnologia | Uso |
|---|---|
| React 19 | Biblioteca de UI |
| Vite 8 | Build tool e dev server |
| React Router DOM 7 | Navegação SPA |
| Lucide React | Ícones |
| CSS Vanilla | Estilização (Dark Mode, glassmorphism, animações) |

### Backend
| Tecnologia | Uso |
|---|---|
| Node.js | Runtime JavaScript |
| Express 4 | Framework HTTP |
| MongoDB | Banco de dados NoSQL |
| Mongoose 8 | ODM para MongoDB |
| JWT (jsonwebtoken) | Autenticação via token |
| bcryptjs | Hash de senhas |
| express-validator | Validação de dados |
| cors | Controle de acesso CORS |
| dotenv | Variáveis de ambiente |
| nodemon | Hot reload em desenvolvimento |

## 📂 Estrutura do Projeto

```
webWithREST/
├── backend/                       # API REST (Node.js + Express)
│   ├── config/
│   │   └── db.js                  # Conexão com MongoDB
│   ├── middleware/
│   │   └── auth.js                # Middleware de autenticação JWT
│   ├── models/
│   │   ├── User.js                # Modelo do Usuário
│   │   └── Transaction.js         # Modelo da Transação
│   ├── routes/
│   │   ├── auth.js                # Rotas de autenticação (login/cadastro)
│   │   └── transacoes.js          # Rotas CRUD de transações
│   ├── .env                       # Variáveis de ambiente (não versionado)
│   ├── .env.example               # Exemplo das variáveis de ambiente
│   ├── package.json               # Dependências do backend
│   └── server.js                  # Ponto de entrada do servidor
│
├── frontend/                      # Aplicação Web (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.jsx        # Barra lateral de navegação
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Context de autenticação (JWT + estado)
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Tela de login
│   │   │   ├── Cadastro.jsx       # Tela de cadastro
│   │   │   ├── Dashboard.jsx      # Dashboard com resumo financeiro
│   │   │   ├── Transacoes.jsx     # Listagem com edição/exclusão
│   │   │   └── NovaTransacao.jsx  # Formulário de nova transação
│   │   ├── services/
│   │   │   └── api.js             # Módulo centralizado de chamadas à API
│   │   ├── App.jsx                # Rotas e layout da aplicação
│   │   ├── App.css                # Estilos do App
│   │   ├── index.css              # Estilos globais
│   │   └── main.jsx               # Ponto de entrada do React
│   ├── package.json               # Dependências do frontend
│   └── vite.config.js             # Configuração do Vite (proxy para API)
│
├── .gitignore
└── README.md
```

## 🗄️ Modelagem do Banco de Dados

### Entidade: User (Usuário)
| Campo | Tipo | Regras |
|---|---|---|
| `_id` | ObjectId | Gerado automaticamente |
| `nome` | String | Obrigatório, mín. 2 caracteres |
| `email` | String | Obrigatório, único, formato válido |
| `senha` | String | Obrigatório, mín. 6 caracteres (hash bcrypt) |
| `createdAt` | Date | Automático (timestamps) |
| `updatedAt` | Date | Automático (timestamps) |

### Entidade: Transaction (Transação)
| Campo | Tipo | Regras |
|---|---|---|
| `_id` | ObjectId | Gerado automaticamente |
| `usuario` | ObjectId → User | **Relacionamento**: referência ao usuário dono |
| `descricao` | String | Obrigatório, mín. 2 caracteres |
| `valor` | Number | Obrigatório, maior que 0 |
| `tipo` | String | Obrigatório, enum: `entrada` \| `saida` |
| `categoria` | String | Obrigatório |
| `data` | Date | Obrigatório |
| `createdAt` | Date | Automático (timestamps) |
| `updatedAt` | Date | Automático (timestamps) |

### Relacionamento
```
User (1) ──────── (N) Transaction
  Um usuário possui muitas transações.
  Cada transação pertence a um único usuário.
  Campo: Transaction.usuario → User._id
```

## 🔌 Endpoints da API

### Autenticação (Públicas)
| Método | Rota | Descrição | Body |
|---|---|---|---|
| `POST` | `/api/auth/cadastro` | Criar nova conta | `{ nome, email, senha }` |
| `POST` | `/api/auth/login` | Autenticar usuário | `{ email, senha }` |

**Resposta do login/cadastro:**
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1...",
  "usuario": { "_id": "...", "nome": "...", "email": "..." }
}
```

### Transações (Protegidas — requer header `Authorization: Bearer <token>`)
| Método | Rota | Descrição | Body |
|---|---|---|---|
| `GET` | `/api/transacoes` | Listar transações do usuário | — |
| `GET` | `/api/transacoes/resumo` | Resumo financeiro (saldo, entradas, saídas) | — |
| `GET` | `/api/transacoes/:id` | Buscar transação por ID | — |
| `POST` | `/api/transacoes` | Criar nova transação | `{ descricao, valor, tipo, categoria, data }` |
| `PUT` | `/api/transacoes/:id` | Atualizar transação | `{ descricao, valor, tipo, categoria, data }` |
| `DELETE` | `/api/transacoes/:id` | Deletar transação | — |

### Health Check
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/health` | Verificar se a API está rodando |

## ⚙️ Instruções para Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MongoDB](https://www.mongodb.com/) rodando localmente na porta 27017 **ou** uma URI do MongoDB Atlas

### 1. Configurar o Banco de Dados (Para a Professora)
Para facilitar a avaliação, as credenciais do banco de dados em nuvem (MongoDB Atlas) já estão inclusas no projeto. 
Basta fazer uma cópia do arquivo de exemplo:
1. Na pasta `backend/`, renomeie o arquivo `.env.example` para `.env`
**(As credenciais reais já estão configuradas no arquivo de exemplo para facilitar o teste).**

### 2. Configurar o Backend
```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```
O backend ficará disponível em `http://localhost:5000`

### 3. Configurar o Frontend
```bash
# Em outro terminal, entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```
O frontend ficará disponível em `http://localhost:5173`

### 4. Usar o Sistema
1. Acesse `http://localhost:5173` no navegador
2. Clique em **"Cadastre-se"** e crie uma conta
3. Faça **login** com as credenciais criadas
4. No **Dashboard**, veja o resumo financeiro
5. Em **Nova Transação**, adicione entradas e saídas
6. Em **Transações**, edite ou exclua registros

## 🔒 Autenticação e Segurança
- Senhas são armazenadas com **hash bcrypt** (nunca em texto plano)
- Autenticação via **JWT (JSON Web Token)** com validade de 7 dias
- Todas as rotas de transações são **protegidas** — requerem token válido
- Cada usuário só acessa **suas próprias transações** (isolamento por `usuario._id`)
- Validações de entrada em todos os endpoints (campos obrigatórios, formatos, limites)
