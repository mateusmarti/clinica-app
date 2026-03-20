# Sistema de Atendimento Inteligente para Clínicas Médicas

Este projeto foi desenvolvido como trabalho acadêmico com o objetivo de criar uma aplicação web completa utilizando Vue.js no frontend e Node.js com Express no backend, incluindo autenticação segura, integração com APIs externas e gerenciamento de agendamentos médicos.

O sistema permite que pacientes e secretários realizem login, agendem consultas, consultem endereços automaticamente pelo CEP e verifiquem a previsão do tempo no dia da consulta.

---

## Funcionalidades

- Cadastro e login seguro de usuários
- Autenticação com JWT
- Agendamento de consultas com verificação de horário
- Listagem de consultas em painel administrativo
- Consulta automática de endereço via CEP
- Consulta de previsão do tempo
- Integração com banco de dados MongoDB
- Frontend com Vue.js e Bootstrap
- Backend com Node.js e Express
- Consumo de APIs externas

---

## Tecnologias utilizadas

### Frontend

- Vue.js
- Vue Router
- Axios
- Bootstrap 5

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt

### APIs externas

- ViaCEP (consulta de endereço)
- Open-Meteo (consulta de clima)

---

## Estrutura do projeto
clinica-app/
├── backend/
├── frontend/
├── README.md
└── .gitignore


---

## Funcionalidades implementadas

### Autenticação

- Cadastro de usuários
- Login com token JWT
- Middleware de proteção de rotas

### Consultas

- Criar consulta
- Listar consultas
- Verificação de horário disponível

### Integrações externas

- API ViaCEP para preenchimento automático de endereço
- API de clima para previsão no dia da consulta

### Frontend

- Tela de login
- Tela de cadastro
- Painel administrativo
- Tela de agendamento
- Interface com Bootstrap

---

## Como executar o projeto

### Backend
cd backend
npm install
npm run dev


Servidor rodando em:
http://localhost:3000


---

### Frontend
cd frontend
npm install
npm run dev


Aplicação rodando em:
http://localhost:5173


---

## Variáveis de ambiente

Criar um arquivo `.env` dentro da pasta backend:
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=seu_segredo

Exemplo:

MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/
JWT_SECRET=segredo123


---

## Rotas principais da API

### Auth
POST /api/auth/register
POST /api/auth/login


### Consultas
GET /api/consultas
POST /api/consultas


### CEP
GET /api/cep/:cep


### Clima
GET /api/clima/:cidade


---

## Requisitos atendidos do trabalho

- Definição das funcionalidades principais
- Estruturação de backend com Node.js e Express
- Integração com MongoDB
- Implementação de autenticação JWT
- Integração com API de CEP
- Integração com API de clima
- Frontend com Vue.js
- Painel administrativo
- Formulários reativos
- Consumo de API
- Documentação
- Publicação no GitHub

---

## Autor

Mateus Martins

Trabalho acadêmico – Sistema Web para Clínica Médica