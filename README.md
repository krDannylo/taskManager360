# TaskManager360

O **TaskManager360** é um projeto de gerenciamento de tarefas. Seu objetivo é demonstrar conhecimentos em arquitetura de software, boas práticas de desenvolvimento, autenticação, persistência de dados, conteinerização e demais tecnologias utilizadas ao longo da implementação. Embora seja uma aplicação simples do ponto de vista funcional, o foco principal está na qualidade do código, na organização do projeto e na minha capacidade e potencial técnico.

##  Tecnologias

- [Node.js](https://nodejs.org/) - Ambiente
- [NestJS](https://nestjs.com/) - Framework
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Prisma ORM](https://www.prisma.io/) - ORM
- [Docker](https://www.docker.com/) - Conteinerização
- [TypeScript](https://www.typescriptlang.org/) - Linguagem
- [JWT](https://jwt.io/) - Autenticação
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) - Hash de senhas
- [yarn](https://yarnpkg.com/) - Gerenciador de Pacotes

## Como executar o projeto

### Pré-requisitos

- **Utilizando Docker** (recomendado), com todo o ambiente configurado automaticamente.
- **Executando localmente**, utilizando uma instalação do Node.js e um banco PostgreSQL.

#### Opção 1 – Docker (Recomendado)

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) *(ou Docker Desktop, que já o inclui)*

#### Opção 2 – Execução local

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- *(Opcional)* [pgAdmin](https://www.pgadmin.org/) para gerenciamento do banco de dados.
- *(Opcional)* [yarn](https://yarnpkg.com/)

**Recomendação**: utilize a execução via Docker para evitar configurações manuais do ambiente.

### Rodando a aplicação

**Importante**: O projeto foi desenvolvido utilizando o gerenciador de pacotes Yarn por isso ele será mencionado durante toda a documentação.

1. Clone o repositório
```bash
git clone https://github.com/krDannylo/taskManager360.git
```

2. Instale as dependências
```bash
yarn install
```
3. Configure as variáveis de ambiente

Na raiz do projeto estão disponíveis os arquivos de exemplo das variáveis de ambiente:

- `.env.example` — para execução **local**.
- `.env.docker.example` — para execução com **Docker**.

Crie uma cópia do arquivo correspondente ao ambiente que será utilizado, renomeando-o para `.env` ou `.env.docker`.

Agora siga os passos conforme o ambiente que será utilizado.

### Ambiente Docker

**Importante**: Antes de executar a aplicação com Docker, verifique se o arquivo entrypoint.sh está salvo com finais de linha no formato LF. Arquivos no formato CRLF podem causar erros de sintaxe ao serem executados no ambiente Linux do container.

- Execute:
```bash
docker compose up --build -d
```
A aplicação estará disponível em `http://localhost:3001` pós todo o processo de build e execução do entrypoint.sh.

### Ambiente Local

Caso execute a aplicação localmente, ajuste os valores das variáveis no `.env` conforme a configuração do seu ambiente, como credenciais do banco de dados, porta local, porta da aplicação e demais parâmetros necessários.

- Execute:
```
npx prisma generate
```

- Em seguida, para criar e subir as migrations execute:
```
npx prisma migrate dev --name init
```

### Scripts disponíveis

- `npm run build`: Compila o projeto
- `npm run start`: Inicia o projeto em modo de produção
- `npm run start:dev`: Inicia o projeto em modo de desenvolvimento com hot-reload

## Estrutura do Projeto

O projeto foi organizado seguindo os princípios de **Clean Architecture** e a divisão por **módulos de domínio**, separando responsabilidades entre regras de negócio, casos de uso, infraestrutura e camada de apresentação.

```
src/
├── module/                    # Módulos da aplicação
│   ├── auth/                  # Autenticação e autorização
│   │   ├── application/       # Casos de uso da autenticação
│   │   ├── domain/            # Regras de negócio e erros do domínio
│   │   ├── infrastructure/    # Strategies, guards e integrações externas
│   │   ├── presentation/      # Controllers e DTOs da API
│   │   └── auth.module.ts
│   │
│   ├── users/                 # Representação do Usuário
│   │   ├── application/       # Casos de uso
│   │   ├── domain/            # Entidades e regras de negócio
│   │   ├── infrastructure/    # Persistência e implementações
│   │   ├── presentation/      # DTOs da API
│   │   └── users.module.ts
│   │
│   └── tasks/                 # Gerenciamento de tarefas
│       ├── application/       # Casos de uso
│       ├── domain/            # Entidades e regras de negócio
│       ├── infrastructure/    # Persistência e implementações
│       ├── presentation/      # Controllers e DTOs da API
│       └── tasks.module.ts
│
├── shared/                    # Recursos compartilhados entre módulos
│   ├── database/              # Configuração e serviços de banco de dados
│   ├── decorators/            # Decorators customizados
│   └── filters/               # Filtros globais de exceção
│
├── app.module.ts              # Módulo raiz da aplicação
└── main.ts                    # Ponto de entrada da aplicação
```

## Requisitos Implementados

1. ✅ **Autenticação**  

2. ✅ **CRUD de tarefas** 

3. ✅ **Regras de Negócio**


## Extras

1. ❌ **Testes automatizados para CRUD**  

2. ✅ **Autenticação**  

3. ✅ **Filtro de tarefas por Status** 

4. ✅ **Documentação da API**

5. ✅ **Uso de design patterns**