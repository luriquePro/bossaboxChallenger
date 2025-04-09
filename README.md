# bossaboxChallenger

API para gerenciamento de ferramentas de desenvolvimento.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração Inicial](#configuração-inicial)
- [Execução](#execução)
- [Testes](#testes)
- [Segurança](#segurança)
- [Documentação da API](#documentação-da-api)
- [Dependências e Requisitos](#dependências-e-requisitos)

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- [Git](https://git-scm.com/downloads)
- [Docker e Docker Compose](https://docs.docker.com/get-docker/)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating)

## Configuração Inicial

### 1. Clone o repositório

```bash
git clone https://github.com/luriquePro/bossaboxChallenger
cd bossaboxChallenger
```

### 2. Configure o ambiente

1. Adicione o arquivo `.env` na pasta raiz do projeto (`./`) com as seguintes variáveis:

   ```.env
   # Configurações gerais
   PORT=4000
   NODE_ENV=development

   # MongoDB
   MONGODB_URL=mongodb://localhost:27017
   MONGODB_NAME=bossabox

   # Segurança
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4000
   FORMAT_MESSAGE_ON_ERROR=true
   ```

2. Use o NVM para instalar e utilizar a versão correta do Node.js:
   ```bash
   nvm install
   nvm use
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie os serviços com Docker:
   ```bash
   docker-compose up -d
   ```

## Execução

### Ambiente de Desenvolvimento

```bash
npm run dev
```

Após iniciar o servidor, você pode acessar a documentação Swagger em:

```
GET /docs
```

### Ambiente de Produção

1. Faça o build do projeto:

   ```bash
   npm run build
   ```

2. Inicie o servidor:
   ```bash
   npm run start
   ```

## Testes

Execute os testes do projeto com:

```bash
npm run test
```

## Segurança

A aplicação implementa várias camadas de segurança para proteção contra vulnerabilidades comuns:

### 1. CORS (Cross-Origin Resource Sharing)

O projeto utiliza uma configuração personalizada de CORS que:

- Permite apenas origens específicas definidas na variável de ambiente `ALLOWED_ORIGINS`
- Habilita credenciais para autenticação entre origens quando necessário

```javascript
this.application.use(
	cors({
		origin: (origin, callback) => {
			const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);
```

### 2. Helmet

A aplicação utiliza o middleware Helmet para implementar várias camadas de proteção:

- **Content Security Policy (CSP)**: Restringe as origens de recursos carregados

  - Scripts permitidos apenas do mesmo domínio e CDNs específicas
  - Estilos permitidos apenas do mesmo domínio e fontes autorizadas
  - Bloqueio de objetos como Flash
  - Imagens permitidas apenas do mesmo domínio e base64
  - Forçamento de conexões HTTPS

- **Desativação do cabeçalho X-Powered-By**: Oculta informações sobre o servidor
- **Filtro XSS**: Ativa proteção contra ataques Cross-Site Scripting

### 3. Express Async Errors

Garante que erros assíncronos sejam capturados e tratados adequadamente pelo middleware de erro.

### 4. Tratamento de Erros Centralizado

Um middleware de erro personalizado (`errorMiddleware`) processa e formata todas as respostas de erro quando `FORMAT_MESSAGE_ON_ERROR` está
habilitado.

## Documentação da API

### Base URL

```
http://localhost:4000
```

### Endpoints Disponíveis

#### 1. Listar Todas as Ferramentas

**Endpoint:** `GET /tools/`

**Parâmetros de Query:**

- `tag` (opcional): Filtra ferramentas pela tag especificada
- `useRegex` (opcional, boolean): Habilita expressões regulares para filtro

**Exemplos:**

```
GET /tools/
GET /tools/?tag=node&useRegex=true
GET /tools/?tag=node&useRegex=false
GET /tools/?tag=node
```

**Resposta de Sucesso (200 OK):**

```json
{
	"is_error": false,
	"response": [
		{
			"id": "1",
			"title": "Ferramenta 1",
			"link": "https://exemplo.com/ferramenta1",
			"description": "Descrição da ferramenta 1",
			"tags": ["tag1", "tag2"]
		}
	]
}
```

#### 2. Obter Ferramenta por ID

**Endpoint:** `GET /tools/{toolId}`

**Parâmetros:**

- `toolId` (path, obrigatório): ID da ferramenta

**Exemplo:**

```
GET /tools/1
```

**Resposta de Sucesso (200 OK):**

```json
{
	"is_error": false,
	"response": {
		"id": "1",
		"title": "Ferramenta 1",
		"link": "https://exemplo.com/ferramenta1",
		"description": "Descrição da ferramenta 1",
		"tags": ["tag1", "tag2"],
		"status": "ACTIVE",
		"createdAt": "2021-01-01T00:00:00.000Z",
		"updateAt": "2021-01-01T00:00:00.000Z"
	}
}
```

#### 3. Criar Nova Ferramenta

**Endpoint:** `POST /tools/`

**Headers:**

- `Content-Type: application/json`

**Corpo da Requisição:**

```json
{
	"title": "Nova Ferramenta",
	"link": "https://exemplo.com/nova-ferramenta",
	"description": "Descrição da nova ferramenta",
	"tags": ["nova", "ferramenta", "exemplo"]
}
```

**Resposta de Sucesso (201 Created):**

```json
{
	"is_error": false,
	"response": {
		"id": "3",
		"title": "Nova Ferramenta",
		"link": "https://exemplo.com/nova-ferramenta",
		"description": "Descrição da nova ferramenta",
		"tags": ["nova", "ferramenta", "exemplo"],
		"status": "ACTIVE"
	}
}
```

#### 4. Excluir Ferramenta

**Endpoint:** `DELETE /tools/{toolId}`

**Parâmetros:**

- `toolId` (path, obrigatório): ID da ferramenta a excluir

**Exemplo:**

```
DELETE /tools/1
```

**Resposta de Sucesso (200 OK):**

```json
{
	"is_error": false,
	"response": {
		"id": "1",
		"title": "Ferramenta 1",
		"link": "https://exemplo.com/ferramenta1",
		"description": "Descrição da ferramenta 1",
		"tags": ["tag1", "tag2"],
		"status": "DELETED"
	}
}
```

#### 5. Atualizar Ferramenta (Parcial)

**Endpoint:** `PATCH /tools/`

> Nota: Os detalhes específicos não estão completamente documentados no Swagger.

### Códigos de Resposta

| Código | Descrição                                                        |
| ------ | ---------------------------------------------------------------- |
| 200    | OK - Requisição processada com sucesso                           |
| 201    | Created - Recurso criado com sucesso                             |
| 400    | Bad Request - Erro de validação ou recurso já existente/excluído |
| 404    | Not Found - Recurso não encontrado                               |
| 500    | Internal Server Error - Erro inesperado no servidor              |

### Modelos de Dados

#### Ferramenta (Criação)

```json
{
	"title": "string",
	"link": "string",
	"description": "string",
	"tags": ["string"]
}
```

#### Ferramenta (Resposta)

```json
{
	"id": "string",
	"title": "string",
	"link": "string",
	"description": "string",
	"tags": ["string"],
	"status": "ACTIVE | INACTIVE | DELETED",
	"createdAt": "date",
	"updateAt": "date"
}
```

## Dependências e Requisitos

### Dependências Principais

- **cors**: Middleware para habilitar CORS
- **dotenv**: Carregamento de variáveis de ambiente
- **express**: Framework web
- **helmet**: Segurança para aplicações Express
- **moment**: Manipulação de datas
- **mongoose**: ODM para MongoDB
- **redis**: Cliente para Redis
- **swagger**: Documentação da API
- **uuid**: Geração de identificadores únicos
- **yup**: Validação de esquemas

### Requisitos de Sistema

- **Node.js**: Versão gerenciada via NVM
- **Docker e Docker Compose**: Para serviços auxiliares (MongoDB, Redis)

---

Para mais informações ou problemas, consulte o [repositório oficial](https://github.com/luriquePro/bossaboxChallenger).
