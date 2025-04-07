# NestJS GraphQL API

**GraphQL API** built with [NestJS](https://nestjs.com/), Prisma, and Apollo GraphQL (code-first).

## 🚀 Getting Started

### Setup

Setup data sample:

```bash
yarn db:push

yarn db:seed
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
query GetUser($userId: Int!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      title
    }
  }
}
```
