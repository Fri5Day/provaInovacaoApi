---

## ✅ Funcionalidades

- 👤 **CRUD de Usuários**  
- 🏢 **CRUD de Salas**  
- 📅 **CRUD de Reservas**
- 🔐 **Autenticação JWT**  
- ⚠️ **Permissões de acesso**  
- ✅ **Validações de conflito de reservas**

---

## 📦 Instalação

Clone este repositório e instale as dependências:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

---

## 🚀 Rotas da API

### 🔐 **Autenticação**

#### **POST** `/login`
**Descrição:** Realizar login no sistema

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **POST** `/usuarios`
**Descrição:** Registrar novo usuário

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "Usuário"
}
```

---

### 👤 **Usuários**

#### **GET** `/user`
**Descrição:** Listar todos os usuários  
**Autenticação:** Bearer Token  
**Permissão:** Admin

#### **POST** `/user`
**Descrição:** Criar novo usuário  
**Autenticação:** Bearer Token  
**Permissão:** Admin

**Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "password": "senha123",
  "role": "Administrador"
}
```

#### **PUT** `/user/:id`
**Descrição:** Atualizar usuário  
**Autenticação:** Bearer Token  
**Permissão:** Admin

**Parâmetros:** `id` (number) - ID do usuário

**Body:**
```json
{
  "name": "Maria Santos Silva",
  "email": "maria.silva@email.com",
  "password": "novaSenha123",
  "role": "Administrador"
}
```

#### **DELETE** `/user/:id`
**Descrição:** Deletar usuário  
**Autenticação:** Bearer Token  
**Permissão:** Admin

**Parâmetros:** `id` (number) - ID do usuário

---

### 🏢 **Salas**

#### **GET** `/salas`
**Descrição:** Listar todas as salas

#### **POST** `/salas`
**Descrição:** Criar nova sala

**Body:**
```json
{
  "name": "Sala de Reuniões A",
  "size": 10,
  "note": "Sala com projetor e ar condicionado",
  "user_id": 1
}
```

#### **PUT** `/salas/:id`
**Descrição:** Atualizar sala

**Parâmetros:** `id` (number) - ID da sala

**Body:**
```json
{
  "name": "Sala de Reuniões A - Atualizada",
  "size": 12,
  "note": "Sala reformada com novo equipamento"
}
```

#### **DELETE** `/salas/:id`
**Descrição:** Deletar sala

**Parâmetros:** `id` (number) - ID da sala

---

### 📅 **Reservas**

#### **GET** `/reservas`
**Descrição:** Listar todas as reservas  
**Autenticação:** Bearer Token

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Reunião Semanal",
    "dateInit": "2024-01-15T14:00:00.000Z",
    "dateEnd": "2024-01-15T16:00:00.000Z",
    "room": {
      "name": "Sala A"
    },
    "user": {
      "name": "João Silva"
    }
  }
]
```

#### **POST** `/reservas`
**Descrição:** Criar nova reserva  
**Autenticação:** Bearer Token

**Body:**
```json
{
  "name": "Reunião de Planejamento",
  "dateInit": "2024-01-15T14:00:00.000Z",
  "dateEnd": "2024-01-15T16:00:00.000Z",
  "room_id": 1,
  "user_id": 1
}
```

**Validações:**
- Data de término deve ser posterior à data de início
- Não é possível criar reservas no passado
- Sala não pode ter conflito de horários

#### **PUT** `/reservas/:id`
**Descrição:** Atualizar reserva  
**Autenticação:** Bearer Token

**Parâmetros:** `id` (number) - ID da reserva

**Body:**
```json
{
  "name": "Reunião de Planejamento - Atualizada",
  "dateInit": "2024-01-15T15:00:00.000Z",
  "dateEnd": "2024-01-15T17:00:00.000Z",
  "room_id": 2,
  "user_id": 1
}
```

#### **DELETE** `/reservas/:id`
**Descrição:** Deletar reserva  
**Autenticação:** Bearer Token

**Parâmetros:** `id` (number) - ID da reserva

---

## 🔑 **Autenticação no Postman**

### **1. Fazer Login**
1. **POST** `http://localhost:3000/login`
2. Copiar o `accessToken` da resposta

### **2. Configurar Authorization**
1. Na aba **Authorization**
2. Selecionar **Bearer Token**
3. Colar o token no campo **Token**

### **3. Exemplo de Header**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 **Roles e Permissões**

- **Administrador:** Acesso total (CRUD usuários, salas, reservas)
- **Usuário:** Acesso a salas e reservas

---

## ⚠️ **Códigos de Erro Comuns**

- **400:** Dados inválidos ou conflito de reserva
- **401:** Token inválido ou não fornecido
- **403:** Sem permissão para acessar o recurso
- **404:** Recurso não encontrado

---

## 🛠️ **Tecnologias**

- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas