
<h1 align="center">Know Your Fan</h1>
<p align="center">
  Plataforma integrada para gestão e engajamento de fãs de eSports.
</p>


<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" />
  <img src="https://img.shields.io/badge/NestJS-Framework-red?logo=nestjs" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/FastAPI-AI%20API-teal?logo=fastapi" />
  <img src="https://img.shields.io/badge/Python-AI-blue?logo=python" />
  <img src="https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Language-blue?logo=typescript" />
</p>

---

O **Know Your Fan** é uma plataforma completa que conecta fãs de eSports a experiências personalizadas, utilizando uma arquitetura moderna com análise de IA e banco de dados em nuvem. A solução permite a criação de perfis ricos de fãs, baseados em dados reais e documentos validados.

## ✨ Principais Recursos

<details>
<summary>🤖 Chatbot Personalizado</summary>
<br>

- **Interface interativa e arrastável**
- **Personalização baseada no perfil do usuário**
- **Suporte a perguntas frequentes organizadas**
- **Adaptação de tema claro/escuro**
</details>

<details>
<summary>👤 Verificação de Identidade</summary>
<br>

- **Validação facial com comparação selfie/documento**
- **Análise de documentos oficiais brasileiros**
- **Verificação segura e privada**
- **Relatórios detalhados de validação**
</details>

<details>
<summary>📊 Análise de Perfil</summary>
<br>

- **Classificação por tipo de fã**
- **Pontuação de engajamento**
- **Potencial de monetização**
- **Preferências de conteúdo**
</details>

<details>
<summary>📱 Portal do Fã</summary>
<br>

- **Perfil personalizado**
- **Integração com redes sociais**
- **Status de verificação**
- **Recomendações de conteúdo**
</details>

<details>
<summary>🧮 Dashboard Analítico</summary>
<br>

- **Visualizações interativas de dados**
- **Métricas de engajamento**
- **Distribuição geográfica**
- **Preferências de conteúdo**
</details>

## 🚀 Componentes Principais

### 🔵 [Frontend - Next.js](./frontend/README.md)

Interface amigável e responsiva para os fãs se cadastrarem, interagirem e visualizarem seu perfil personalizado. Desenvolvida com **Next.js** e integra com a API backend para envio de dados e arquivos.

- Upload de documentos e selfies
- Formulários interativos de registro
- Exibição de chatbot e recomendações personalizadas

### 🟢 [Backend - NestJS](./backend/README.md)

API REST robusta desenvolvida com **NestJS** que gerencia autenticação, persistência dos dados dos fãs e comunicação com o serviço de IA.

- Autenticação e registro de fãs
- Processamento de arquivos (documentos/selfies)
- Integração com MongoDB e serviço de IA

### 🤖 [Serviço de IA - FastAPI + Python](./ai-service/README.md)

Serviço dedicado de inteligência artificial responsável por:

- Verificação de documento e rosto (biometria facial)
- Análise de perfil de engajamento
- Classificação do tipo de fã e potencial de receita

## 🔄 Fluxo de Dados

```mermaid
graph LR
  A[Frontend
(Next.js)] --> B[Backend
(NestJS)]
  B --> C[AI Service
(FastAPI + Python)]
  C --> B
  B --> D[Database
(MongoDB)]
```

## 🧰 Tecnologias Utilizadas

| Camada       | Tecnologias                                             |
| ------------ | ------------------------------------------------------- |
| **Backend**  | NestJS · MongoDB · Mongoose · Multer · Swagger · Axios  |
| **Frontend** | Next.js · TypeScript · TailwindCSS · Zustand            |
| **AI**       | FastAPI · Python · OpenCV · Face Recognition · Pydantic |
| **DevOps**   | Railway     |


## 📦 Estrutura do Projeto

```
know-your-fan/
├── frontend/       # Projeto em Next.js
├── backend/        # API em NestJS
└── ai-service/     # Serviço de IA em FastAPI + Python
```

## 📄 Documentação

Cada subprojeto possui seu próprio `README.md`. Acesse:

- [`frontend/README.md`](./frontend/README.md)
- [`backend/README.md`](./backend/README.md)
- [`ai-service/README.md`](./ai-service/README.md)

## 📝 Fluxos de Usuários

### Registro e Verificação

1. Usuário preenche formulário com dados básicos
2. Upload de documento de identidade e selfie
3. Sistema verifica identidade através de reconhecimento facial
4. Análise de perfil classifica o tipo de fã
5. Usuário recebe acesso ao portal personalizado

### Interação com Chatbot

1. Usuário acessa o portal e inicia conversa
2. Chatbot personalizado responde com base no perfil
3. Sugestões de perguntas frequentes específicas para o tipo de fã
4. Integração com eventos e notícias da FURIA

### Análise para Administradores

1. Administrador acessa dashboard analítico
2. Visualização de métricas de engajamento da base de fãs
3. Relatórios de distribuição geográfica e preferências
4. Identificação de oportunidades de monetização

## 📊 Demonstração

<div align="center">
  <img src="frontend/screenshots/homePage_DarkTheme.png" alt="Interface do FALAFURIA" width="80%"/>
  <p><em>Interface do Chatbot FALAFURIA</em></p>
</div>

## 📈 Roadmap

- [ ] **Integração com APIs de Redes Sociais**
- [ ] **Análise de Vídeo para Reconhecimento de Emoções**
- [ ] **Gamificação e Sistema de Recompensas**
- [ ] **Personalização Avançada do Chatbot**
- [ ] **Suporte a Múltiplos Idiomas**
- [ ] **App Móvel via PWA**
- [ ] **Dashboard Administrativo Expandido**

## 🙏 Agradecimentos

- Equipe da FURIA Esports
- Comunidades de Next.js, NestJS e FastAPI
- OpenAI pela tecnologia de processamento de linguagem natural
- Contribuidores do projeto face_recognition

---

<p align="center">
  Feito com ❤️ para fãs de eSports.
</p>
