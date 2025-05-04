# Know Your Fan AI API

## Descrição

O **Know Your Fan AI API** é um projeto que utiliza inteligência artificial para analisar dados de fãs de eSports e realizar verificação facial. Ele permite criar perfis detalhados de fãs, classificando-os com base em seu engajamento, preferências de conteúdo e potencial de monetização. Além disso, oferece uma funcionalidade de verificação de identidade baseada em reconhecimento facial.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
ai-services/
│
├── main.py                     # Arquivo principal para inicializar a API
├── models/
│   └── fan_data.py             # Modelo de dados para representar informações de fãs
├── routes/
│   ├── analysis.py             # Rota para análise de dados de fãs
│   └── face_verification.py    # Rota para verificação facial
├── services/
│   ├── text_analysis.py        # Serviço para análise de dados de fãs
│   └── face_validator.py       # Serviço para validação facial
└── utils/
    └── file_utils.py           # Utilitário para manipulação de arquivos
```

## Tecnologias Utilizadas

- **FastAPI**: Framework para criação de APIs rápidas e eficientes.
- **Face Recognition**: Biblioteca para reconhecimento facial.
- **Pydantic**: Validação de dados e criação de modelos.
- **Python**: Linguagem principal do projeto.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Python 3.9+**
- **Docker** (opcional, mas recomendado para execução com `docker-compose`)

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/know-your-fan.git
   cd know-your-fan/ai-services
   ```

2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

3. (Opcional) Configure o ambiente Docker:

   Caso prefira usar Docker, execute:

   ```bash
   docker-compose up --build
   ```

4. Execute o servidor localmente:

   ```bash
   uvicorn main:app --reload
   ```

   O servidor estará disponível em `http://127.0.0.1:8000`.

## Endpoints da API

### 1. **Análise de Dados de Fãs**

- **Rota**: `/analyze`
- **Método**: `POST`
- **Descrição**: Analisa os dados de um fã e retorna informações como tipo de fã, engajamento, preferências de conteúdo e potencial de monetização.
- **Exemplo de Payload**:

  ```json
  {
    "fullName": "João Silva",
    "nickname": "FuriaFan",
    "email": "joao@email.com",
    "username": "joaosilva",
    "password": "senha123",
    "cpfDisplay": "123.456.789-00",
    "cpf": "12345678900",
    "location": "São Paulo",
    "socials": ["Twitter", "Instagram", "Facebook"],
    "ecommerce": ["Já comprei e uso com orgulho"],
    "content": ["CS:GO", "CS:GO", "Valorant"]
  }
  ```

- **Resposta**:

  ```json
  {
    "fullName": "João Silva",
    "fanType": "super fã",
    "engagementScore": 45,
    "contentPreference": "CS:GO",
    "potentialRevenue": "alto",
    "recommendationSummary": "João Silva é classificado como super fã. Gosta de conteúdo como 'CS:GO' e interage em 3 redes. Potencial de monetização: alto."
  }
  ```

### 2. **Verificação Facial**

- **Rota**: `/verify`
- **Método**: `POST`
- **Descrição**: Verifica a identidade de um usuário comparando uma selfie com uma foto de documento.
- **Parâmetros**:

  - `cpf` (form-data): CPF do usuário.
  - `selfie` (file): Arquivo de imagem da selfie.
  - `document` (file): Arquivo de imagem do documento.

- **Resposta**:

  ```json
  {
    "identityVerified": true
  }
  ```

## Estrutura de Dados

### Modelo `FanData`

O modelo `FanData` é usado para representar os dados de um fã. Ele inclui os seguintes campos:

- **Obrigatórios**:
  - `fullName`: Nome completo.
  - `nickname`: Apelido.
  - `email`: E-mail.
  - `username`: Nome de usuário.
  - `password`: Senha.
  - `cpfDisplay`: CPF formatado.
  - `cpf`: CPF sem formatação.
  - `location`: Localização.
  - `socials`: Lista de redes sociais.
  - `ecommerce`: Lista de interações com e-commerce.
  - `content`: Lista de conteúdos consumidos.

- **Opcionais**:
  - `influencers`, `events`, `favoriteGame`, `faceit`, `hltv`, `others`, `exclusiveContent`, `message`.

- **Campos Extras** (gerados pela análise):
  - `fanType`, `engagementScore`, `contentPreference`, `potentialRevenue`, `recommendationSummary`.

## Testes

Para garantir o funcionamento correto, você pode criar testes unitários para os serviços e rotas. Utilize bibliotecas como `pytest` para isso.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License.

## Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: `contato@furia.com`.