# NestJS GraphQL API

**GraphQL API** built with [NestJS](https://nestjs.com/), Prisma, and Apollo GraphQL (code-first).

## 🚀 Getting Started

### Setup

Setup env

```bash
yarn copy:examples
```

Setup database with data sample:

```bash
yarn db:setup
```

### Start the Server

To start the development server, run:

```bash
yarn dev
```

The API will be available at http://localhost:3000/graphql.

### Testing the API

You can test the GraphQL API using the built-in GraphQL Playground at http://localhost:3000/graphql. Example query with variables:

```graphql
mutation {
  login(input: { email: "alice@example.com", password: "password123" }) {
    access_token
  }
}

query {
  user(id: 1) {
    id
    name
    email
    posts {
      title
    }
  }
}
```
