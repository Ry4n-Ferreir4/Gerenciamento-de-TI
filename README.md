# Sistema de Gerenciamento - Backend e Frontend

Este projeto é um sistema de gerenciamento completo, composto por um backend em **Python (Flask)** e um frontend em **React** com **Styled Components**. O sistema é projetado para gerenciar usuários e acessar diferentes painéis de controle com base nas permissões dos usuários.

## Visão Geral

### Backend

O backend fornece uma API RESTful para gerenciar usuários, autenticação e acesso a diferentes áreas da aplicação. Ele é desenvolvido em Python usando o Flask e utiliza SQLite como banco de dados.

**Funcionalidades Principais:**

- **Autenticação e Registro:** Endpoints para registro e login de usuários. O sistema usa JWT para autenticação.
- **Gerenciamento de Usuários:** CRUD completo para usuários, com diferentes permissões (Admin, Gestor, User).
- **Painéis de Controle:** Endpoints para exibir diferentes painéis com base nas permissões do usuário (Dashboard, Gestor, Admin).

**Endpoints Principais:**

- `POST /register`: Registra um novo usuário. (Requer autenticação JWT com permissões de Admin ou Gestor)
- `POST /login`: Faz login e retorna um token de acesso JWT.
- `GET /user`: Obtém informações do usuário autenticado.
- `GET /users`: Lista todos os usuários. (Requer autenticação JWT com permissões de Admin)
- `PUT /users/<id>`: Atualiza as informações de um usuário específico. (Requer autenticação JWT com permissões de Admin)
- `DELETE /users/<id>`: Remove um usuário específico. (Requer autenticação JWT com permissões de Admin)
- `GET /dashboard`: Exibe o painel de controle. (Requer autenticação JWT)
- `GET /gestor`: Exibe o painel do Gestor. (Requer autenticação JWT com permissões de Admin ou Gestor)
- `GET /admin`: Exibe o painel do Admin. (Requer autenticação JWT com permissões de Admin)

### Frontend

O frontend é desenvolvido em **React** e **Styled Components**, oferecendo uma interface intuitiva para interagir com a API e gerenciar o sistema.

**Funcionalidades Principais:**

- **Autenticação e Registro:** Páginas para login e registro de usuários, com validação de formulários.
- **Painéis de Controle:** Diferentes páginas para os painéis de Dashboard, Gestor e Admin, com base nas permissões do usuário.
- **Proteção de Rotas:** Uso de rotas protegidas para garantir que apenas usuários autenticados e autorizados possam acessar certas páginas.
- **Feedback Visual:** Componentes de loading para informar o usuário sobre o status das operações.

**Estrutura dos Componentes:**

- `App.js`: Configura as rotas da aplicação e protege-as com base nas permissões do usuário.
- `index.js`: Ponto de entrada da aplicação, configura o React e aplica estilos globais.
- `components/Loading.js`: Exibe uma animação de carregamento.
- `components/ProtectedRoute.js`: Protege rotas para garantir que usuários autenticados e autorizados possam acessá-las.
- `components/StyledComponents.js`: Define componentes estilizados com `Styled Components`.
- `config/axiosConfig.js`: Configura a instância do Axios para requisições HTTP.
- `context/AuthContext.js`: Gerencia o estado de autenticação e fornece funções para login e logout.
- `pages/Login.js`: Página de login.
- `pages/Register.js`: Página de registro de novos usuários.
- `pages/Dashboard.js`: Página principal do painel de controle.
- `pages/Profile.js`: Página de perfil do usuário.
- `pages/Admin.js`: Página específica para administradores.
- `utils/validation.js`: Define esquemas de validação para formulários.
