# Backend do Projeto

Este projeto backend é construído com Flask e fornece APIs para autenticação e gerenciamento de usuários. Utiliza SQLite como banco de dados e JWT para autenticação.

## Estrutura do Projeto

```
backend/
├── app.py
├── config.py
├── extensions.py
├── models.py
└── routes/
    ├── init.py
    ├── auth.py
    └── user.py
```

## Arquivos e Funções

### `app.py`

Este arquivo é o ponto de entrada da aplicação. Ele inicializa a aplicação Flask, configura as extensões e registra os blueprints das rotas. É responsável por criar as tabelas do banco de dados e iniciar o servidor Flask.

### `config.py`

Contém as configurações da aplicação, incluindo a URI do banco de dados SQLite e a chave secreta para JWT.

### `extensions.py`

Define e inicializa as extensões utilizadas na aplicação, como SQLAlchemy para ORM e JWTManager para autenticação JWT.

### `models.py`

Define o modelo de dados `Usuario`, que representa a estrutura da tabela de usuários no banco de dados.

### `routes/`

Contém as rotas da API, organizadas em diferentes módulos:

- **`auth.py`**: Gerencia as rotas relacionadas à autenticação, incluindo registro e login de usuários.
- **`user.py`**: Gerencia as rotas relacionadas ao gerenciamento de usuários, incluindo a visualização, atualização e exclusão de usuários.

## Uso da API

Abaixo estão as rotas disponíveis na API, suas descrições e os requisitos de autenticação.

### **POST /register**

Registra um novo usuário. 

- **Requisitos de Autenticação:** Requer autenticação JWT com permissões de Admin ou Gestor.

### **POST /login**

Faz login e retorna um token de acesso JWT.

- **Requisitos de Autenticação:** Nenhum

### **GET /user**

Obtém informações do usuário autenticado.

- **Requisitos de Autenticação:** Requer autenticação JWT.

### **GET /users**

Lista todos os usuários.

- **Requisitos de Autenticação:** Requer autenticação JWT com permissões de Admin.

### **PUT /users/<id>**

Atualiza as informações de um usuário específico.

- **Requisitos de Autenticação:** Requer autenticação JWT com permissões de Admin.

### **DELETE /users/<id>**

Remove um usuário específico.

- **Requisitos de Autenticação:** Requer autenticação JWT com permissões de Admin.

### **GET /dashboard**

Exibe o painel de controle.

- **Requisitos de Autenticação:** Requer autenticação JWT.

### **GET /gestor**

Exibe o painel do Gestor.

- **Requisitos de Autenticação:** Requer autenticação JWT com permissões de Admin ou Gestor.

### **GET /admin**

Exibe o painel do Admin.

- **Requisitos de Autenticação:** Requer autenticação JWT com permissões de Admin.
