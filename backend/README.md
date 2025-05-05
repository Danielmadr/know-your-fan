# Know Your Fan - Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

**Know Your Fan** é uma API desenvolvida com o framework [NestJS](https://nestjs.com/) para autenticação e gerenciamento de fãs de esports. O projeto utiliza MongoDB como banco de dados e integra serviços de análise de dados com IA para enriquecer os perfis dos fãs.

## Funcionalidades

- **Gerenciamento de Fãs**: Criação e armazenamento de perfis de fãs com dados pessoais e preferências.
- **Autenticação**: Login seguro para fãs.
- **Integração com IA**: Envio de dados e arquivos para análise por um serviço de IA.
- **Documentação com Swagger**: Endpoints documentados para fácil integração.

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **NestJS**: Framework para construção de APIs escaláveis.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM para MongoDB.
- **Axios**: Cliente HTTP para integração com serviços externos.
- **Swagger**: Documentação interativa da API.
- **Multer**: Upload de arquivos.

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/know-your-fan.git
   cd know-your-fan/backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   MONGODB_URI=mongodb://localhost:27017/know-your-fan
   ```

---

## Uso

### Executar o projeto

- **Modo de desenvolvimento**:

  ```bash
  npm run start:dev
  ```

- **Modo de produção**:

  ```bash
  npm run build
  npm run start:prod
  ```

### Documentação da API

Após iniciar o servidor, acesse a documentação interativa no Swagger:

```
http://localhost:4000/api
```

---

## Endpoints Principais

### **Fãs**

- **POST /fans**: Cria um novo fã com dados e arquivos.

  **Exemplo de Request**:

  ```bash
  curl -X POST http://localhost:4000/fans \
    -F "document=@/caminho/para/documento.pdf" \
    -F "selfie=@/caminho/para/selfie.jpg" \
    -F "fullName=João Silva" \
    -F "nickname=jsilva" \
    -F "email=joao.silva@example.com" \
    -F "username=jsilva123" \
    -F "password=senha123"
  ```

- **Resposta de Sucesso**:

  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "João Silva",
    "nickname": "jsilva",
    "email": "joao.silva@example.com",
    "username": "jsilva123",
    "documentPath": "./uploads/document-123456789.pdf",
    "selfiePath": "./uploads/selfie-987654321.jpg",
    "createdAt": "2025-05-04T12:00:00.000Z",
    "updatedAt": "2025-05-04T12:00:00.000Z"
  }
  ```

### **Autenticação**

- **POST /auth/login**: Realiza o login do fã.

  **Exemplo de Request**:

  ```json
  {
    "username": "jsilva123",
    "password": "senha123"
  }
  ```

- **Resposta de Sucesso**:

  ```json
  {
    "nickname": "jsilva",
    "personalChatbot": "Chatbot123"
  }
  ```

---

## Estrutura do Projeto

```plaintext
backend/
├── src/
│   ├── ai/                # Módulo de integração com IA
│   ├── auth/              # Módulo de autenticação
│   ├── fan/               # Módulo de gerenciamento de fãs
│   ├── app.module.ts      # Módulo principal
│   ├── main.ts            # Arquivo de inicialização
├── test/                  # Testes E2E
├── dist/                  # Build gerado (ignorado pelo Git)
├── .env                   # Variáveis de ambiente (ignorado pelo Git)
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Documentação do projeto
```

---

## Testes

### Executar Testes Unitários

```bash
npm run test
```

### Executar Testes E2E

```bash
npm run test:e2e
```

### Cobertura de Testes

```bash
npm run test:cov
```

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## Licença

Este projeto é licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

- **Autor**: Daniel
- **Email**: daniel@example.com
- **LinkedIn**: [linkedin.com/in/daniel](https://linkedin.com/in/daniel)

---
```