# ONG-ADAPV

## 📌 Visão Geral

O **ONG-ADAPV** é um sistema web desenvolvido para apoiar a gestão de uma ONG voltada à **adoção e proteção de animais**. O projeto é composto por um **backend em Node.js com MySQL** e um **frontend em React utilizando Vite**, permitindo cadastro, consulta e gerenciamento de informações relacionadas à ONG.

O projeto possui caráter **acadêmico e prático**, exigindo **configuração manual do banco de dados** para funcionamento correto.

---

## 🏗️ Estrutura do Projeto

```
ONG-ADAPV/
├── backend-ong/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── docs/
│   ├── TRABALHO ERS ONG-ADAPV.pdf
│   ├── Orientações.txt
│   └── Rotas_Backend_Ong.txt
│
└── README.md
```

---

## ⚙️ Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MySQL 8
- mysql2 (promise)
- JWT (JSON Web Token)
- dotenv
- CORS

### Frontend
- React
- Vite
- Axios
- React Router DOM
- Bootstrap / React-Bootstrap

---

## 🔐 Variáveis de Ambiente (Backend)

Crie um arquivo `.env` dentro de `backend-ong/`:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUASENHA
DB_NAME=bd_ong

JWT_SECRET=este_e_um_segredo_muito_longo_e_dificil_de_adivinhar
JWT_EXPIRES_IN=1d
```

---

## 🗄️ Banco de Dados

⚠️ **IMPORTANTE**

O projeto **não inclui arquivo `.sql`** para criação das tabelas.

É obrigatório:

```sql
CREATE DATABASE bd_ong DEFAULT CHARACTER SET utf8mb4;
```

As tabelas devem ser criadas manualmente ou importadas a partir de um `.sql` fornecido separadamente.

Sem isso, o backend não funcionará.

---

## ▶️ Execução do Projeto

### Backend

```bash
cd backend-ong
npm install
npm run dev
```

Servidor:
```
http://localhost:3000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:
```
http://localhost:5173
```

---

## 🔗 Integração Frontend ↔ Backend

O frontend consome a API REST do backend via Axios.

Certifique-se de que:
- Backend esteja em execução
- URL base da API esteja correta
- CORS esteja habilitado

---

## 📄 Documentação

Arquivos adicionais em `docs/`:
- Orientações.txt
- Rotas_Backend_Ong.txt

---

## 🚨 Problemas Comuns

- Banco criado sem tabelas
- Variáveis de ambiente incorretas
- Porta MySQL incorreta
- Backend não iniciado

---

## 👥 Autoria

Projeto acadêmico – ONG ADAPV

---

## 📌 Observações Finais

Este sistema depende diretamente de uma configuração correta do banco de dados. Recomenda-se revisar toda a documentação antes da execução.
