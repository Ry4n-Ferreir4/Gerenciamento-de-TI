# Frontend - Gestão de Usuários e Painéis

Este projeto frontend é desenvolvido com **React** e **Styled Components**. O objetivo é fornecer uma interface para gerenciamento de usuários e visualização de diferentes painéis de controle, baseados nas permissões dos usuários.

## Estrutura do Projeto

### `src/App.js`

**Função:** Configura as rotas da aplicação e gerencia o acesso às páginas com base na autenticação e nas permissões do usuário. Utiliza o `react-router-dom` para definir quais componentes são renderizados conforme a URL.

**Como Funciona:** As rotas são protegidas por um componente `ProtectedRoute`, que verifica o status de autenticação e as permissões do usuário. Se o usuário não estiver autenticado ou não tiver a permissão necessária, será redirecionado para a página de login ou para uma página padrão.

### `src/index.js`

**Função:** Ponto de entrada da aplicação React. Inicializa o aplicativo e aplica estilos globais.

**Como Funciona:** O componente `App` é renderizado dentro de um contêiner de `React.StrictMode` para garantir práticas recomendadas de desenvolvimento. Estilos globais são importados para garantir uma aparência consistente.

### `src/components/Loading.js`

**Função:** Exibe uma animação de carregamento enquanto os dados estão sendo processados ou o usuário está sendo autenticado.

**Como Funciona:** O componente usa `Styled Components` para criar uma animação com pontos giratórios. Isso fornece um feedback visual para o usuário durante o carregamento.

### `src/components/ProtectedRoute.js`

**Função:** Protege rotas específicas, garantindo que apenas usuários autenticados e com permissões adequadas possam acessá-las.

**Como Funciona:** Verifica o status de autenticação e as permissões do usuário. Se o usuário não estiver autenticado ou não tiver as permissões necessárias, é redirecionado para a página de login ou para uma página padrão.

### `src/components/StyledComponents.js`

**Função:** Define os componentes estilizados com `Styled Components`, como botões, formulários e tabelas.

**Como Funciona:** Utiliza a biblioteca `Styled Components` para criar componentes com estilos encapsulados. Isso garante uma separação clara entre a lógica do componente e seu estilo, facilitando a manutenção e a consistência visual.

### `src/config/axiosConfig.js`

**Função:** Configura uma instância do Axios para realizar requisições HTTP.

**Como Funciona:** Define a URL base da API e configura os headers padrão, facilitando a realização de chamadas à API em diferentes partes da aplicação. Isso centraliza a configuração e evita repetição de código.

### `src/config/config.js`

**Função:** Armazena a URL base da API e outras configurações globais.

**Como Funciona:** Define variáveis de configuração que podem ser usadas em toda a aplicação. Isso facilita a atualização de URLs e outras configurações sem a necessidade de modificar o código em múltiplos locais.

### `src/context/AuthContext.js`

**Função:** Gerencia o estado de autenticação do usuário e fornece funções para login e logout.

**Como Funciona:** Utiliza o contexto do React para fornecer informações sobre o usuário autenticado e funções de autenticação para componentes em toda a aplicação. O estado de autenticação é verificado e mantido no contexto, permitindo que outros componentes acessem essas informações.

### `src/pages/Login.js`

**Função:** Página de login onde os usuários podem inserir suas credenciais para acessar a aplicação.

**Como Funciona:** Inclui um formulário onde os usuários inserem seu email e senha. O formulário é validado e, ao enviar, tenta autenticar o usuário com a API. Se a autenticação for bem-sucedida, o usuário é redirecionado para a página principal.

### `src/pages/Register.js`

**Função:** Página de registro para criar novos usuários, acessível apenas para administradores e gestores.

**Como Funciona:** Exibe um formulário para inserir detalhes do novo usuário, como nome de usuário, email, senha e tipo de usuário. Após o envio, os dados são enviados para a API para criar um novo usuário.

### `src/pages/Dashboard.js`

**Função:** Página principal do painel de controle que exibe informações gerais e relatórios.

**Como Funciona:** Mostra informações e relatórios de interesse geral para todos os usuários autenticados. O conteúdo exibido pode variar dependendo das permissões e do tipo de usuário.

### `src/pages/Profile.js`

**Função:** Página de perfil onde os usuários podem visualizar e atualizar suas informações pessoais.

**Como Funciona:** Permite que os usuários atualizem seu email e outras informações do perfil. Também inclui um botão de logout para encerrar a sessão do usuário.

### `src/pages/Admin.js`

**Função:** Página exclusiva para administradores, com funcionalidades e visões específicas.

**Como Funciona:** Oferece ferramentas e visualizações que só são acessíveis para usuários com o papel de Admin. Pode incluir opções para gerenciar usuários, visualizar relatórios detalhados, etc.

### `src/utils/validation.js`

**Função:** Define esquemas de validação para formulários utilizando a biblioteca `zod`.

**Como Funciona:** Estabelece regras para validar os dados inseridos nos formulários, como verificar se o email é válido ou se a senha tem o comprimento adequado. Isso ajuda a garantir que os dados sejam consistentes e seguros.

---

Este README fornece uma visão geral das funcionalidades do frontend e explica como cada parte do código contribui para o funcionamento da aplicação. Ele deve ajudar novos desenvolvedores a entender a estrutura e o propósito de cada componente e módulo.
