<p align="center">
</p>
<p align="center">Know Your Fan Backend API - Uma plataforma para gestão e engajamento de fãs de eSports.</p>
<p align="center">
<a href="https://nestjs.com" target="_blank"><img src="https://img.shields.io/badge/built%20with-NestJS-red.svg" alt="Construído com NestJS" /></a>
<a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/database-MongoDB-green.svg" alt="Banco de Dados MongoDB" /></a>
<a href="https://www.python.org/" target="_blank"><img src="https://img.shields.io/badge/AI%20services-Python-blue.svg" alt="Serviços de IA Python" /></a>
<a href="https://fastapi.tiangolo.com/" target="_blank"><img src="https://img.shields.io/badge/AI%20API-FastAPI-teal.svg" alt="API de IA FastAPI" /></a>
</p>

## Descrição

A **Know Your Fan Backend API** é um projeto baseado em NestJS que oferece um sistema backend robusto para a gestão de perfis de fãs de eSports. Ele inclui autenticação, gerenciamento de dados de fãs e integração com serviços de IA para análise de perfis. Este sistema permite que organizações compreendam melhor seus fãs, verifiquem suas identidades e criem experiências personalizadas com base em seus perfis.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
backend/
│
├── src/
│   ├── ai/                    # Integração com serviços de IA
│   │   ├── ai.module.ts
│   │   └── ai.service.ts
│   ├── auth/                  # Módulo de autenticação
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── dto/
│   │       └── login.dto.ts
│   ├── fan/                   # Módulo de gerenciamento de fãs
│   │   ├── fan.controller.ts
│   │   ├── fan.module.ts
│   │   ├── fan.service.ts
│   │   ├── dto/
│   │   │   └── create-fan.dto.ts
│   │   └── schemas/
│   │       └── fan.schema.ts
│   ├── app.controller.ts      # Controlador principal
│   ├── app.module.ts          # Módulo principal
│   ├── app.service.ts         # Serviço principal
│   └── main.ts                # Ponto de entrada da aplicação
│
└── uploads/                   # Diretório para armazenar arquivos enviados
```

## Tecnologias Utilizadas

* **NestJS**: Framework progressivo para aplicações Node.js do lado do servidor
* **MongoDB**: Banco de dados NoSQL para armazenar perfis de fãs
* **Mongoose**: Modelagem de objetos MongoDB para Node.js
* **Swagger**: Documentação de APIs
* **Multer**: Middleware para upload de arquivos
* **Axios**: Cliente HTTP para comunicação com serviços de IA

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* **Node.js 16+**
* **MongoDB** (instalação local ou string de conexão remota)
* **NPM** ou **Yarn**

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/your-username/know-your-fan.git
   cd know-your-fan/backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` no diretório raiz com a seguinte variável:

   ```
   MONGODB_URI=mongodb://localhost:27017/know-your-fan
   ```

4. Rode o servidor:

   ```bash
   # desenvolvimento
   npm run start

   # modo watch
   npm run start:dev

   # produção
   npm run start:prod
   ```

   O servidor estará disponível em `http://localhost:4000`.

5. Acesse a documentação Swagger:

   Abra o navegador e acesse `http://localhost:4000/api` para visualizar a documentação.

## Endpoints da API

### 1. **Autenticação**

* **Rota**: `/auth/login`

* **Método**: `POST`

* **Descrição**: Autentica um fã e retorna informações básicas do perfil.

* **Corpo da Requisição**:

  ```json
  {
    "username": "fan123",
    "password": "password123"
  }
  ```

* **Resposta**:

  ```json
  {
    "name": "João Silva",
    "nickname": "FanNickname",
    "personalChatbot": "Chatbot123"
  }
  ```

### 2. **Cadastro de Fã**

* **Rota**: `/fans`

* **Método**: `POST`

* **Descrição**: Cria um novo perfil de fã com dados e arquivos, depois processa via serviço de IA.

* **Parâmetros**:

  * Dados do formulário com informações do fã
  * Arquivo `document`: Documento de identidade
  * Arquivo `selfie`: Foto selfie do fã

* **Resposta**:

  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "João Silva",
    "nickname": "jsilva",
    "email": "joao.silva@example.com",
    "username": "jsilva123",
    "documentPath": "./uploads/document-123456789.pdf",
    "selfiePath": "./uploads/selfie-987654321.jpg",
    "fanType": "super fã",
    "engagementScore": 45,
    "contentPreference": "CS:GO",
    "potentialRevenue": "alto",
    "recommendationSummary": "João Silva foi classificado como super fã...",
    "personalChatbot": "ChatbotID123",
    "createdAt": "2025-05-04T12:00:00.000Z",
    "updatedAt": "2025-05-04T12:00:00.000Z"
  }
  ```

## Modelos de Dados

### Esquema de Fã

O esquema representa um perfil de fã com os seguintes campos:

* **Informações Básicas**:

  * `fullName`: Nome completo
  * `nickname`: Apelido
  * `email`: Email
  * `username`: Nome de usuário
  * `password`: Senha
  * `cpfDisplay`: CPF formatado
  * `cpf`: CPF sem formatação
  * `location`: Localização

* **Preferências e Interesses**:

  * `socials`: Redes sociais
  * `ecommerce`: Interações com e-commerce
  * `content`: Conteúdo consumido
  * `influencers`: Influenciadores favoritos
  * `events`: Eventos favoritos
  * `favoriteGame`: Jogo favorito
  * `instagram`: Instagram
  * `x`: X (antigo Twitter)
  * `others`: Outras redes

* **Arquivos**:

  * `documentPath`: Caminho do documento de identidade
  * `selfiePath`: Caminho da selfie

* **Dados de Análise de IA**:

  * `documentStatus`: Status da verificação do documento
  * `documentReport`: Relatório da verificação
  * `selfieStatus`: Status da verificação da selfie
  * `selfieMatchScore`: Similaridade da selfie
  * `fanStatus`: Status de verificação do fã
  * `fanType`: Classificação do fã
  * `engagementScore`: Pontuação de engajamento
  * `contentPreference`: Preferência de conteúdo
  * `potentialRevenue`: Potencial de receita
  * `recommendationSummary`: Sumário de recomendação
  * `personalChatbot`: ID do chatbot pessoal

## Integração com IA

O backend integra com um serviço de IA para analisar os perfis dos fãs. A IA realiza:

1. **Verificação de documento**: Validação do documento de identidade
2. **Reconhecimento facial**: Comparar selfie com foto do documento
3. **Análise de fã**: Avalia dados para determinar engajamento, preferências e potencial de receita

## Testes

Execute os testes com os seguintes comandos:

```bash
# testes unitários
npm run test

# testes end-to-end
npm run test:e2e

# cobertura de testes
npm run test:cov
```

## Deploy

Para implantação em produção:

1. Defina variáveis de ambiente adequadas
2. Configure a conexão com MongoDB para produção
3. Estabeleça um armazenamento de arquivos (ex: nuvem)
4. Habilite CORS se necessário
5. Configure autenticação/autorizacão adequadas

## Contribuições

Contribuições são bem-vindas! Siga os passos:

1. Fork o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça commit: `git commit -m 'Minha nova feature'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Contato

Para dúvidas ou sugestões, entre em contato: `contact@know-your-fan.com`
